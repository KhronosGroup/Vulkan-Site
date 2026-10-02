# Look-At Controllers

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Procedural_Animation_IK/05_look_at.html

## Table of Contents

- [What a Look-At Controller Does](#_what_a_look_at_controller_does)
- [What_a_Look-At_Controller_Does](#_what_a_look_at_controller_does)
- [Understanding the Coordinate Space Problem](#_understanding_the_coordinate_space_problem)
- [Understanding_the_Coordinate_Space_Problem](#_understanding_the_coordinate_space_problem)
- [The Look-At Rotation](#_the_look_at_rotation)
- [The_Look-At_Rotation](#_the_look_at_rotation)
- [Distributing the Rotation Across Multiple Joints](#_distributing_the_rotation_across_multiple_joints)
- [Distributing_the_Rotation_Across_Multiple_Joints](#_distributing_the_rotation_across_multiple_joints)
- [Smoothing the Look-At Target](#_smoothing_the_look_at_target)
- [Smoothing_the_Look-At_Target](#_smoothing_the_look_at_target)

## Content

A look-at controller is a procedural system that rotates one or more joints—typically the neck and head—so that the character appears to be looking at a specific point in the world. Unlike foot placement IK, which corrects the position of an end effector, a look-at controller is purely rotational: it answers the question "what rotation must these joints have so that the eye direction points at the target?"

The application domain is wide. An enemy soldier turning their head to track a player who is moving across their line of sight. A shop NPC whose head follows the player character as they walk through a market. A sniper character whose neck and upper spine slowly rotate toward a distant target. A horse whose head turns toward an interesting sound. In all of these cases, the base body animation continues playing—the character walks, talks, breathes—while the look-at system independently rotates the head joints.

Look-at controllers can be implemented as a special case of IK (the "effector" is the eye direction rather than a position), or as a direct rotation computation. We will implement the direct approach because it is simpler, more controllable, and sufficient for the vast majority of practical use cases.

The tricky part of a look-at controller is not the math—the math is simple—but getting the coordinate spaces right. Every joint has a local coordinate system defined by the glTF hierarchy. The "forward" direction of the head joint is not necessarily the world Y or Z axis; it depends on how the artist set up the rig in Blender. You need to know which local axis of the head joint points "forward" (toward the face) and which points "up," because these are the axes you will be aligning.

In a standard Blender humanoid rig following common conventions, the head’s local +Y axis typically points upward (toward the crown of the head) and the +Z axis points forward (toward the nose). But this is a convention, not a law—you should verify it for your specific rig by inspecting the joint orientation in Blender. We will parameterize the forward and up axes in our look-at implementation so that it works regardless of rig convention.

Given the head joint’s current world position and orientation, and a target world position, the look-at rotation is computed as follows:

Compute the desired forward direction: `desired_forward = normalize(target - head_world_pos)`.

Extract the current forward direction: `current_forward = normalize(head_world_rotation * local_forward_axis)`.

Compute the rotation from current to desired: this is the same "rotate one vector onto another" quaternion we used in CCD.

Optionally apply the angle to the local rotation in the scene graph, converting from world space back to parent space the same way we did in the IK solver.

Let’s implement this as a reusable function:

struct LookAtController {
    uint32_t  head_node_idx;           // The primary head/neck joint
    glm::vec3 local_forward_axis;      // The "forward" axis in the joint's local space
    glm::vec3 local_up_axis;           // The "up" axis in the joint's local space
    float     max_angle_degrees;       // Maximum deviation from the rest pose
    float     weight;                  // Blend weight: 0 = no look-at, 1 = full
};

void apply_look_at(
    std::vector&     nodes,
    const LookAtController& controller,
    const glm::vec3&        target_world)
{
    Node& head = nodes[controller.head_node_idx];

    // World position of the head joint
    glm::vec3 head_world_pos = glm::vec3(head.world_matrix[3]);

    glm::vec3 to_target = target_world - head_world_pos;
    float dist = glm::length(to_target);
    if (dist  0.9999f) return; // Already looking at target

    float angle = std::acos(dot);

    // Clamp the rotation to the maximum allowed angle.
    // This prevents the head from twisting 180 degrees around.
    float clamped_angle = std::min(angle, glm::radians(controller.max_angle_degrees));

    // Apply the weight: a weight of 0.5 would only rotate halfway to the target.
    // This is useful for blending the look-at in and out smoothly.
    clamped_angle *= controller.weight;
    if (clamped_angle 

A single-joint look-at controller applied only to the head joint works but does not look natural. A real person does not rotate only their head to look at something—they also rotate their neck, and for large angular differences, they rotate their upper spine. The look-at rotation should be **distributed** across the joint chain from spine to head, with each joint taking a share of the total rotation.

This distribution serves two purposes. First, it avoids the mechanical look of a head that rotates on a fixed neck—humans have a flexible neck that participates in the rotation. Second, it allows the total look-at angle to exceed the head’s individual maximum range of motion, since multiple joints each contribute a smaller part of the total.

Distributing the rotation is straightforward: instead of applying the full angle to the head joint, apply a fraction of it to each joint in the chain, from spine to head. The fractions should sum to one and can be weighted however you like—typically the head gets the largest share and the spine gets the smallest:

struct LookAtChain {
    std::vector joints;      // Ordered from root (spine) to tip (head)
    std::vector    weights;     // Per-joint share of the total rotation (must sum to 1)
    glm::vec3 local_forward_axis;      // Forward axis in the *head joint's* local space
    glm::vec3 local_up_axis;           // Up axis in the *head joint's* local space
    float     max_total_angle_degrees; // Maximum total look-at angle across all joints
    float     blend_weight;            // Global blend weight (0 = none, 1 = full)
};

void apply_look_at_chain(
    std::vector&    nodes,
    const LookAtChain&    chain,
    const glm::vec3&      target_world)
{
    if (chain.joints.empty()) return;
    uint32_t head_idx = chain.joints.back();

    // Compute the total desired rotation (same as single-joint look-at)
    glm::vec3 head_world_pos  = glm::vec3(nodes[head_idx].world_matrix[3]);
    glm::vec3 to_target       = target_world - head_world_pos;
    float dist = glm::length(to_target);
    if (dist 

A typical weight distribution for a three-joint neck-to-head chain might be `[0.2, 0.3, 0.5]`: the lower neck contributes 20% of the rotation, the upper neck contributes 30%, and the head contributes 50%. These values are aesthetic choices—profile them visually and adjust until the motion looks natural for your character.

Just like foot placement, a look-at controller needs temporal smoothing or the character’s head will snap directly to a new target position every frame. The smoothing is the same exponential moving average approach: maintain a smoothed target position that chases the raw target each frame:

struct LookAtState {
    glm::vec3 smoothed_target;  // The temporally-smoothed look-at target
    bool initialized = false;
};

void update_look_at_target(
    const glm::vec3& raw_target,
    float            speed,      // Higher = faster tracking; typical range 3–15
    float            delta_time,
    LookAtState&     state)
{
    if (!state.initialized) {
        state.smoothed_target = raw_target;
        state.initialized     = true;
        return;
    }
    float t = glm::clamp(speed * delta_time, 0.0f, 1.0f);
    state.smoothed_target = glm::mix(state.smoothed_target, raw_target, t);
}

The `speed` parameter controls the "stiffness" of the head tracking. A speed of 3 produces slow, languid tracking suitable for a character casually watching something in the distance. A speed of 12 produces snappy tracking suitable for an alert soldier scanning for threats. Varying the speed based on the character’s state—calm versus alert—adds a subtle layer of expressiveness that pays dividends in cutscenes.

[Previous: Foot Placement on Uneven Terrain](04_foot_placement.html) | [Next: Physics-Driven Lean](06_physics_driven_lean.html)
