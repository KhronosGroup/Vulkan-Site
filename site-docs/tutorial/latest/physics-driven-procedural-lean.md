# Physics-Driven Procedural Lean

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Procedural_Animation_IK/06_physics_driven_lean.html

## Table of Contents

- [Why Characters Need to Lean](#_why_characters_need_to_lean)
- [Why_Characters_Need_to_Lean](#_why_characters_need_to_lean)
- [The Physics of Leaning](#_the_physics_of_leaning)
- [The_Physics_of_Leaning](#_the_physics_of_leaning)
- [Computing the Lean Vector](#_computing_the_lean_vector)
- [Computing_the_Lean_Vector](#_computing_the_lean_vector)
- [Applying the Lean to the Spine](#_applying_the_lean_to_the_spine)
- [Applying_the_Lean_to_the_Spine](#_applying_the_lean_to_the_spine)
- [Combining Lean with Look-At and IK](#_combining_lean_with_look_at_and_ik)
- [Combining_Lean_with_Look-At_and_IK](#_combining_lean_with_look_at_and_ik)

## Content

The single most common visual artifact in third-person action games—visible to any player who knows what to look for—is characters that run around corners in a perfectly vertical stance. In reality, when a person (or any object with mass) turns, inertia pushes them outward and they lean inward to compensate. A bicycle rider leaning hard into a turn. A sprinter’s whole body angled forward. A soldier pivoting sharply to respond to a sound. All of these involve a characteristic tilt of the torso that we read as "momentum" and "weight."

When this lean is missing, characters feel weightless. They look like they are gliding on rails rather than moving through a world that resists them. Adding even a small amount of physically-derived tilt to a character—particularly during acceleration, deceleration, and turning—dramatically improves the sense of mass and presence.

The good news is that this does not require a full physics simulation. The lean angle is a function of the character’s current velocity vector and its rate of change, both of which we can compute from the physics simulation’s output (or from the character controller, if you have one). We can then apply that lean as a procedural rotation to the spine joints, layered on top of the base animation.

Let’s understand what lean actually is before we compute it. When a character accelerates forward, inertia resists the change in velocity. From the character’s reference frame, this feels like a backward force—which is why you lean forward when running and slightly backward when braking hard. The lean angle is determined by the ratio of the horizontal acceleration to the vertical gravitational acceleration:

`lean_angle = atan2(horizontal_acceleration, gravity)`

For a character accelerating at 5 m/s² on a planet with standard gravity (9.8 m/s²), the lean angle is approximately `atan2(5, 9.8) ≈ 27 degrees`. That is a substantial lean—the kind you see in sprinters—and reflects the fact that aggressive acceleration requires a significant forward tilt to keep the body’s center of mass over the feet.

For turning, the physics are slightly different. When a character moves in a circle, centripetal acceleration pulls them toward the center of the turn. The lean required to counteract this is:

`lean_angle = atan2(v² / r, gravity)`

where `v` is the speed and `r` is the turn radius. This is why a tighter turn at the same speed requires more lean, and why faster turns require more lean than slower ones.

In practice, we compute the acceleration vector and centripetal acceleration from the character’s velocity history, combine them into a single "effective gravity" vector, and tilt the spine to align with that vector.

We need the character’s velocity and the change in velocity (acceleration) over the last frame. If you are using a physics engine, both of these are available from the character controller’s rigid body. If you are using a kinematic character controller (one that you move directly), you will need to track the previous velocity and compute the delta yourself:

struct CharacterMotionState {
    glm::vec3 velocity;           // Current world-space velocity
    glm::vec3 previous_velocity;  // Velocity from last frame
    glm::vec3 smoothed_lean_vec;  // Low-pass filtered lean direction
};

// Compute the "effective downward" direction that the character perceives
// due to their motion. The spine should align perpendicular to this direction.
glm::vec3 compute_lean_vector(
    const CharacterMotionState& motion,
    float                       gravity,     // Positive value (e.g. 9.8)
    float                       delta_time,
    float                       lean_strength) // Scale factor; 1.0 = physically accurate
{
    // Linear acceleration from velocity change
    glm::vec3 accel = (motion.velocity - motion.previous_velocity) / delta_time;

    // For lean, we care about the horizontal component of acceleration.
    // Vertical acceleration (e.g., falling) should not tilt the spine.
    glm::vec3 horizontal_accel(accel.x, 0, accel.z);

    // The effective gravity that the character "feels" in their reference frame
    // is the sum of real gravity (downward) and the reaction to their acceleration
    // (opposite to their acceleration direction).
    // We negate horizontal_accel because lean opposes the acceleration direction.
    glm::vec3 effective_gravity(
        -horizontal_accel.x * lean_strength,
        -gravity,
        -horizontal_accel.z * lean_strength
    );

    return glm::normalize(effective_gravity);
}

The `lean_strength` parameter is a tuning knob. A value of 1.0 gives you physically accurate lean angles, which may be too extreme for a game character (27 degrees of lean looks natural on a sprinting athlete but might look exaggerated on a game character who is also waving a sword). Values between 0.3 and 0.7 typically look best for game characters—enough to convey weight and momentum without looking like the character is about to fall over.

With the lean vector computed, we apply it as a spine rotation. The spine’s "up" axis (the direction the torso points) should align with the negative of the effective gravity vector—in other words, the spine should tilt opposite to the perceived gravitational pull.

We distribute the lean across the spine joints using the same approach as the look-at chain: each joint takes a fraction of the total tilt angle, with the lower spine joints contributing more than the upper ones (the lean originates from the hips and is transmitted upward through the spine):

struct LeanController {
    std::vector spine_joints;   // Ordered from pelvis to upper spine
    std::vector    joint_weights;  // Per-joint share (should sum to 1)
    glm::vec3 local_up_axis;             // The joint's "up" in local space
    float     max_lean_degrees;          // Safety cap on total lean
    float     smoothing_speed;           // How quickly lean responds to velocity changes
};

void apply_physics_lean(
    std::vector&          nodes,
    const LeanController&       controller,
    const CharacterMotionState& motion,
    float                       gravity,
    float                       delta_time,
    float                       lean_strength,
    glm::vec3&                  smoothed_lean_vec) // persistent state
{
    // Compute the raw lean vector from this frame's physics data
    glm::vec3 raw_lean_vec = compute_lean_vector(motion, gravity, delta_time, lean_strength);

    // Smooth it over time to prevent jittery lean from noisy acceleration data
    float t = glm::clamp(controller.smoothing_speed * delta_time, 0.0f, 1.0f);
    smoothed_lean_vec = glm::normalize(glm::mix(smoothed_lean_vec, raw_lean_vec, t));

    // The world "up" direction
    const glm::vec3 world_up(0, 1, 0);

    // The lean angle is the angle between world_up and the smoothed lean vector
    float lean_angle = std::acos(glm::clamp(glm::dot(smoothed_lean_vec, -world_up), -1.0f, 1.0f));
    if (lean_angle 

At this point, we have three procedural layers that all modify spine and head joints: foot placement IK (which adjusts the pelvis height and leg chains), look-at (which rotates the neck and head joints), and physics-driven lean (which tilts the spine joints). All three need to play together without interference.

The key is the **order of application**. Procedural corrections to the scene graph are applied sequentially, and each layer builds on the result of the previous one. The correct order for a typical humanoid character is:

**Play the base animation.** This sets all joint local rotations from keyframe data. The scene graph now reflects the animation pose.

**Propagate world matrices.** Run the dirty-flag update to compute world matrices for all nodes.

**Apply foot placement IK.** This adjusts the pelvis translation and leg chain rotations. The foot positions are now correct relative to the terrain.

**Propagate world matrices again.** The leg corrections changed world matrices for all leg descendants; we need fresh world matrices before proceeding.

**Apply physics-driven lean.** This tilts the spine joints. The lean is applied on top of the animation and foot corrections.

**Propagate world matrices again.**

**Apply look-at.** This rotates the neck and head. By applying look-at last, it can respond to the spine’s lean-adjusted orientation—which is what a real neck does when the body is tilted.

**Final world matrix propagation.** The scene graph is now ready for the skinning compute shader.

Performing multiple world matrix propagation passes each frame may seem expensive. In practice, for a humanoid character with a skeleton of ~60 joints, each propagation pass is a handful of matrix multiplications per joint—easily done in microseconds. The total cost is negligible compared to the draw calls and compute dispatches that follow.

[Previous: Look-At Controllers](05_look_at.html) | [Next: Conclusion](07_conclusion.html)
