# FABRIK: Forward And Backward Reaching IK

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Procedural_Animation_IK/03_fabrik.html

## Table of Contents

- [A Different Philosophy](#_a_different_philosophy)
- [A_Different_Philosophy](#_a_different_philosophy)
- [The FABRIK Algorithm](#_the_fabrik_algorithm)
- [The_FABRIK_Algorithm](#_the_fabrik_algorithm)
- [Implementing FABRIK](#_implementing_fabrik)
- [FABRIK with Constraints](#_fabrik_with_constraints)
- [FABRIK_with_Constraints](#_fabrik_with_constraints)
- [Choosing Between CCD and FABRIK](#_choosing_between_ccd_and_fabrik)
- [Choosing_Between_CCD_and_FABRIK](#_choosing_between_ccd_and_fabrik)

## Content

Where CCD thinks about joints and rotations, FABRIK—**Forward And Backward Reaching Inverse Kinematics**—thinks about positions. This is a fundamental difference in approach, and it produces fundamentally different visual results.

FABRIK was published by Andreas Aristidou and Joan Lasenby in 2011, and it became influential quickly because it is both visually superior to CCD in many scenarios and remarkably simple to implement. The core idea is to treat each joint as a point in space and each bone as a rigid rod connecting two consecutive points. Given a target for the end effector, FABRIK redistributes the joints along the chain in two phases: a backward phase that anchors the end effector at the target and propagates the chain toward the root, and a forward phase that re-anchors the root at its original position and propagates back toward the end effector. Repeating these two phases rapidly converges to a solution.

The reason FABRIK avoids the end-effector bias that CCD can exhibit is that both phases treat every joint in the chain symmetrically. No joint has more influence than another by default—each one simply adjusts to satisfy the constraint imposed by its neighbor. The resulting pose tends to look more natural for reaching motions where the whole arm or leg should participate in the movement.

Let’s be concrete. We have a chain of joints at positions `p[0], p[1], …​, p[n]`, where `p[0]` is the root and `p[n]` is the end effector. The bone lengths are `d[i] = |p[i+1] - p[i]|`, and they are fixed—bones don’t stretch. The target is `t`.

**Backward phase:**

Set `p[n] = t`. The end effector is now at the target.

For each joint from `n-1` down to `0`: compute the direction from `p[i]` to `p[i+1]`, and place `p[i]` along that direction at distance `d[i]` from `p[i+1]`. In other words, `p[i] = p[i+1] + normalize(p[i] - p[i+1]) * d[i]`.

After the backward phase, the end effector is at the target, but the root `p[0]` has moved from its original position.

**Forward phase:**

Set `p[0]` back to its original position `b` (the root is fixed; it can’t move).

For each joint from `1` to `n`: compute the direction from `p[i-1]` to `p[i]`, and place `p[i]` along that direction at distance `d[i-1]` from `p[i-1]`. In other words, `p[i] = p[i-1] + normalize(p[i] - p[i-1]) * d[i-1]`.

After the forward phase, the root is back in its correct place, but the end effector may have moved slightly away from the target again.

**Iteration:** Repeat backward and forward phases until `|p[n] - t| 

The convergence is remarkably fast—typically two to four full iterations (one backward plus one forward each) are sufficient for humanoid chains. The reason is that FABRIK is essentially performing gradient descent in position space, and the objective function is smooth and well-conditioned.

FABRIK operates on positions rather than rotations, so we first extract positions from the scene graph, run the solver, and then convert the result back into joint rotations. This conversion step—positions-to-rotations—is what makes FABRIK slightly more involved than it first appears:

void solve_fabrik(std::vector& nodes, const IKChain& chain, const glm::vec3& target_world)
{
    const int n = static_cast(chain.joints.size());
    if (n == 0) return;

    // Step 1: Extract current world positions and compute bone lengths.
    std::vector positions(n + 1);
    std::vector     lengths(n);

    for (int i = 0; i = 0; --i) {
            glm::vec3 dir = glm::normalize(positions[i] - positions[i + 1]);
            positions[i] = positions[i + 1] + dir * lengths[i];
        }

        // --- Forward pass: re-anchor the root at its original position ---
        positions[0] = root_pos;
        for (int i = 1; i  0.9999f) continue; // Already pointing the right way

        float     angle = std::acos(dot);
        glm::vec3 axis  = glm::cross(current_dir, solved_dir);
        if (glm::length(axis) 

The positions-to-rotations conversion (Step 4) may look familiar—it is the same "rotate one vector onto another" operation as CCD, just applied with the solved bone direction as the target rather than the IK target position. The key difference is that when we enter this loop, we already know exactly where every joint **should** be, so we are making precise corrections rather than iterative approximations.

Adding joint limits to FABRIK is slightly more complex than with CCD because FABRIK repositions joints as points rather than rotating them directly. The standard approach is to enforce constraints **during** the backward and forward passes by clamping the direction vector before computing the new joint position.

For a hinge constraint, when computing the direction from joint `i` to joint `i+1`, we project that direction onto the plane perpendicular to the hinge axis, then clamp the angle. For a ball-and-socket constraint, we clamp the direction to the cone defined by the swing limit. The implementation is more involved than the unconstrained case, and getting it right requires careful handling of the reference frames:

// Clamp direction 'd' to be within a cone of half-angle 'limit_deg'
// around the reference direction 'ref', all in world space.
glm::vec3 clamp_to_cone(const glm::vec3& d, const glm::vec3& ref, float limit_deg)
{
    float limit_rad = glm::radians(limit_deg);
    float current_angle = std::acos(glm::clamp(glm::dot(d, ref), -1.0f, 1.0f));

    if (current_angle 

Applying this during the FABRIK pass changes the position computation for ball-and-socket joints from the unconstrained formula to one that clamps the direction before computing the step. This preserves the bone length while enforcing the cone constraint.

Both algorithms are practical, both are fast, and both produce good results for the common cases. The choice comes down to the specific motion:

For **foot placement on uneven terrain**, CCD is usually sufficient and is simpler to implement correctly. The corrections are small, the chain is short (two or three bones), and the end-effector bias of CCD is not perceptible for small adjustments.

For **full-arm reaching**, FABRIK generally looks better. When a character reaches for an object at arm’s length, you want the entire arm—shoulder, elbow, wrist—to participate naturally in the reach. FABRIK distributes the correction across the whole chain more evenly than CCD does.

For **spines and longer chains**, FABRIK is strongly preferred. CCD applied to a five-bone spine will over-rotate the bones near the pelvis while the upper spine barely moves, which looks stiff and unnatural. FABRIK produces a smooth, fluid bend that reads correctly.

Many production engines use both: CCD for limb IK and FABRIK for spines and special cases. There is no reason you cannot do the same—the two algorithms have the same interface from the scene graph’s perspective.

[Previous: Cyclic Coordinate Descent IK](02_ccd_ik.html) | [Next: Foot Placement on Uneven Terrain](04_foot_placement.html)
