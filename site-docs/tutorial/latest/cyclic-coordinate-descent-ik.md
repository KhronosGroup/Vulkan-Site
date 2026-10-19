# Cyclic Coordinate Descent IK

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Procedural_Animation_IK/02_ccd_ik.html

## Table of Contents

- [Understanding the Problem Geometrically](#_understanding_the_problem_geometrically)
- [Understanding_the_Problem_Geometrically](#_understanding_the_problem_geometrically)
- [The CCD Algorithm Step by Step](#_the_ccd_algorithm_step_by_step)
- [The_CCD_Algorithm_Step_by_Step](#_the_ccd_algorithm_step_by_step)
- [Implementing CCD](#_implementing_ccd)
- [Adding Joint Limits to CCD](#_adding_joint_limits_to_ccd)
- [Adding_Joint_Limits_to_CCD](#_adding_joint_limits_to_ccd)
- [CCD’s Strengths and Weaknesses](#_ccds_strengths_and_weaknesses)
- [CCD’s_Strengths_and_Weaknesses](#_ccds_strengths_and_weaknesses)

## Content

Before we look at any algorithm, it helps to understand what we are actually asking the computer to solve. Imagine a three-link chain: a thigh connected to a shin connected to a foot. Each joint can rotate. The foot (the **end effector**) is currently somewhere in the air, and we want it to land exactly on a target point on the ground. The question is: what rotations do we need to apply to the thigh and shin joints to make that happen?

If you have ever tried to solve this with a direct analytical formula, you quickly discover the problem. For a two-bone chain (think: a simple arm with a shoulder and elbow), there is a closed-form solution—it involves a bit of trigonometry and produces either two solutions (elbow up or elbow down) or no solution if the target is out of reach. But for a three-bone chain, or a five-bone spine, there is no clean closed form. The system becomes **underdetermined**: there are more degrees of freedom (rotation axes) than constraints (the three coordinates of the target), which means there are infinitely many poses that place the end effector at the target, and we need an algorithm to pick among them.

**Cyclic Coordinate Descent**, or CCD, solves this with a beautifully simple heuristic: instead of trying to solve the whole chain at once, it rotates one joint at a time to bring the end effector as close as possible to the target, then moves to the next joint, then the next, cycling through the chain repeatedly until the end effector is close enough or we have run out of iterations.

Let’s trace through one iteration of CCD for a leg chain. Assume we have joints `[thigh, knee, ankle]` and a target position on the ground. CCD works from the end of the chain backward toward the root.

**Step 1 — Start at the joint closest to the end effector.** For a leg chain, this is the ankle. Compute two vectors: one from the ankle to the current end effector position (the toe), and one from the ankle to the target position. Rotate the ankle joint so that the first vector aligns with the second. Because the ankle is the joint closest to the end effector, rotating it produces the most direct movement of the effector toward the target.

**Step 2 — Move to the next joint inward.** Now consider the knee. Again, compute the vector from the knee to the end effector’s **new** position (it moved when we rotated the ankle), and the vector from the knee to the target. Rotate the knee to align them. The knee has a longer lever arm than the ankle—rotating it sweeps the end effector through a larger arc—so this step often produces a large correction.

**Step 3 — Move to the root joint.** Repeat for the thigh. By now, the end effector may already be very close to the target—the algorithm’s convergence property means that each pass through the chain reduces the error.

**Step 4 — Check convergence.** Compute the distance from the end effector to the target. If it is below some threshold (typically a millimeter or less in world space), stop. If not, start another pass from the ankle and repeat.

The genius of CCD is that each individual rotation step is trivially computed: it is just the quaternion that rotates one vector onto another. The algorithm’s convergence is not guaranteed in the worst case, but in practice for humanoid skeletons with reasonable joint limits, it converges in two to five iterations.

Let’s write a self-contained CCD solver. It takes the joint chain (as a list of node indices into our scene graph), the target world position, and the maximum number of iterations:

struct IKChain {
    std::vector joints;  // Ordered from root to end effector
    uint32_t effector_node;        // The node whose position we are trying to place
    float    threshold;            // Convergence threshold in world-space units
    int      max_iterations;       // Safety cap
    glm::vec3 target_world;        // Target position
    glm::vec3 pole_vector;         // For algorithms like FABRIK or constrained CCD
};

// Rotate joint 'node' so that the vector from the joint to the effector aligns
// with the vector from the joint to the target. Updates the node's local rotation
// and marks the subtree dirty so world matrices are recomputed.
static void ccd_rotate_joint(
    std::vector& nodes,
    uint32_t           joint_idx,
    uint32_t           effector_idx,
    const glm::vec3&   target_world)
{
    Node& joint = nodes[joint_idx];

    // We need the world position of the joint. This assumes world matrices
    // are up to date for this joint (but not necessarily for descendants).
    glm::vec3 joint_world = glm::vec3(joint.world_matrix[3]);

    // Vector from this joint to the current effector position
    glm::vec3 to_effector = glm::normalize(
        glm::vec3(nodes[effector_idx].world_matrix[3]) - joint_world);

    // Vector from this joint to where we want the effector to be
    glm::vec3 to_target = target_world - joint_world;
    float dist = glm::length(to_target);
    if (dist  0.9999f) return; // Already aligned

    float     angle = std::acos(dot);
    glm::vec3 axis  = glm::cross(to_effector, to_target);
    if (glm::length(axis) & nodes, const IKChain& chain, const glm::vec3& target_world)
{
    // Check reachability: if the target is farther than the total chain length,
    // we can still run CCD but it will converge toward the direction of the target
    // without reaching it. For foot placement, this is usually a sign that the
    // character's body needs to be lowered, which we handle at a higher level.

    for (int iter = 0; iter (chain.joints.size()) - 1; j >= 0; --j) {
            ccd_rotate_joint(nodes, chain.joints[j], chain.effector_node, target_world);
        }
    }
}

The `get_world_rotation` helper (which we added to our `Node` struct in Chapter 2) extracts the pure rotation quaternion from a world matrix by normalizing the basis columns to remove scale.

The basic CCD implementation above has one critical problem: it applies rotations in any direction, without regard for anatomical constraints. The knee might bend sideways, the ankle might rotate in ways that look broken. We need to clamp the joint’s rotation to its allowed range after each CCD step.

The cleanest way to integrate joint limits with CCD is to clamp the joint’s local rotation after each `ccd_rotate_joint` call. Since our joint limits are stored as part of the physics constraint definition (from Chapter 4), we can re-use that data:

// After computing joint.local_rotation in ccd_rotate_joint, apply limits:
void apply_hinge_limit(Node& joint, const ConstraintDef& limits)
{
    // For a hinge joint, the local rotation should only have a component
    // around the hinge axis. We extract the angle around that axis and clamp it.
    glm::vec3 axis = limits.hinge_axis;
    float angle = 2.0f * std::atan2(
        glm::dot(glm::vec3(joint.local_rotation.x, joint.local_rotation.y, joint.local_rotation.z), axis),
        joint.local_rotation.w
    );
    float clamped = glm::clamp(
        glm::degrees(angle),
        limits.hinge_min_deg,
        limits.hinge_max_deg
    );
    joint.local_rotation = glm::angleAxis(glm::radians(clamped), axis);
}

For ball-and-socket joints, limiting the rotation is more involved. The swing limit is a cone constraint, and enforcing it requires clamping the swing component of the quaternion’s decomposition. Most physics engines provide a helper for this; if yours does not, you can implement it by decomposing the local rotation into swing-and-twist components relative to the joint’s rest pose.

CCD is fast. Each iteration is a small number of vector operations and quaternion multiplications, and it converges quickly for most humanoid chains. It integrates naturally with joint limits and is straightforward to implement correctly. For these reasons, it was the dominant IK algorithm in real-time game development for many years and remains a good default choice for most applications.

CCD’s main weakness is a visual artifact known as **end-effector bias**: because it processes joints from tip to root, the joints near the end effector tend to rotate more than joints near the root. For a leg, this means the ankle tends to be over-rotated while the thigh moves only slightly. This produces a characteristic stiff-thigh, ankle-bent look that becomes obvious when the character is reaching to extremes. For foot placement on gently uneven terrain, this artifact is generally not noticeable. For reaching animations where the arm extends far from the body, it can look wrong.

The algorithm we will look at next, FABRIK, addresses this weakness with a different strategy.

[Previous: Introduction](01_introduction.html) | [Next: FABRIK](03_fabrik.html)
