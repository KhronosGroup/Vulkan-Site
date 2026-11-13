# Constraints & Joint Limits

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Physics_Integration/03_constraints_and_joint_limits.html

## Table of Contents

- [Why Unconstrained Ragdolls Are Unwatchable](#_why_unconstrained_ragdolls_are_unwatchable)
- [Why_Unconstrained_Ragdolls_Are_Unwatchable](#_why_unconstrained_ragdolls_are_unwatchable)
- [The Two Constraints Every Humanoid Needs](#_the_two_constraints_every_humanoid_needs)
- [The_Two_Constraints_Every_Humanoid_Needs](#_the_two_constraints_every_humanoid_needs)
- [Angular Limits: The Human Range of Motion](#_angular_limits_the_human_range_of_motion)
- [Angular_Limits:_The_Human_Range_of_Motion](#_angular_limits_the_human_range_of_motion)
- [Parsing Constraint Definitions](#_parsing_constraint_definitions)
- [Parsing_Constraint_Definitions](#_parsing_constraint_definitions)
- [Creating the Constraints](#_creating_the_constraints)
- [Creating_the_Constraints](#_creating_the_constraints)
- [Reference Limits for a Humanoid](#_reference_limits_for_a_humanoid)
- [Reference_Limits_for_a_Humanoid](#_reference_limits_for_a_humanoid)

## Content

If you took the physics bodies we created in the previous section, switched them all to dynamic mode right now, and let the physics solver run, you would get a ragdoll—but a terrible one. Every body part would flail independently. The arm would not be connected to the shoulder. The knee would bend sideways, backward, forward, and in a complete circle. The spine would crumple into a chaotic pile of disconnected body segments. The character would look less like a falling person and more like a bag of loosely related objects that happened to occupy the same space a moment ago.

The problem is that physics bodies, by default, have no knowledge of each other. They are individual simulated objects. The thing that connects them—the thing that makes a knee **a knee** and a shoulder **a shoulder**—is a **constraint**. A physics constraint is a rule that the solver must obey: it can say "these two bodies must stay a fixed distance apart," or "this body can rotate relative to that one, but only within this angular range," or "this body is attached to that one and can pivot freely in any direction."

Without constraints, you have a pile of separate bricks. With constraints, you have a skeleton.

For a humanoid ragdoll, two constraint types cover the entire body: the **Ball-and-Socket** constraint and the **Hinge** constraint.

A Ball-and-Socket constraint (sometimes called a Spherical constraint) allows rotation in any direction but prevents the bodies from separating. Think of how a human shoulder or hip works: you can rotate your arm or leg in a wide cone of directions, but the joint itself doesn’t translate—the ball stays in the socket. This is the right constraint for shoulders, hips, the neck, and the ankles. In physics engine terms, it removes all three translational degrees of freedom but leaves three rotational degrees of freedom active, subject to angular limits.

A Hinge constraint allows rotation around exactly one axis. Think of a knee: it bends in one plane and does not rotate laterally or axially (at least not significantly). A hinge constraint enforces this single-axis rotation and is the right choice for knees, elbows, and sometimes the wrist depending on how much detail your ragdoll requires. It removes all three translational degrees of freedom and two of the three rotational degrees of freedom, leaving only one.

The distinction matters because it directly determines how a ragdoll reads to the eye. A knee that bends sideways is immediately, viscerally wrong. A shoulder that bends in a cone looks right even if the exact cone angles aren’t biologically precise. Matching the constraint type to the anatomical function is the single most important thing you can do to make a ragdoll look plausible.

A constraint type alone is not enough. A ball-and-socket joint with no angular limits allows the arm to rotate 360 degrees—which means a character’s arm could point straight backward behind their shoulder, or spin like a helicopter blade. Even though a real shoulder is a ball-and-socket joint, it has a finite range of motion defined by soft tissue, and exceeding that range produces the "arm rotating impossibly" look that makes ragdolls laughable.

Angular limits tell the physics solver the valid range of rotation for each axis. For a Hinge constraint, this is straightforward: a minimum and maximum angle around the single hinge axis. For a Ball-and-Socket, it is more complex—we typically specify a **swing limit** (the cone half-angle describing how far the bone can deviate from its neutral axis) and a **twist limit** (how far the bone can rotate around its own primary axis).

Storing these limits in glTF extras follows the same pattern as the collider definitions. A shoulder bone’s extras might look like this:

{
  "physics": {
    "collider": "capsule",
    "radius": 0.06,
    "half_height": 0.14,
    "mass": 2.5,
    "constraint": {
      "type": "ball_socket",
      "swing_limit_deg": 80,
      "twist_limit_deg": 45,
      "parent_bone": "spine_upper"
    },
    "collision_group": "arm",
    "collision_mask": "world,props"
  }
}

And a knee bone’s extras:

{
  "physics": {
    "collider": "capsule",
    "radius": 0.055,
    "half_height": 0.20,
    "mass": 3.0,
    "constraint": {
      "type": "hinge",
      "hinge_axis": [0, 0, 1],
      "limit_min_deg": -140,
      "limit_max_deg": 0,
      "parent_bone": "thigh"
    },
    "collision_group": "leg",
    "collision_mask": "world,props"
  }
}

The `parent_bone` field tells us which body this constraint connects to. The constraint will be created between the parent bone’s physics body and this bone’s physics body. The `hinge_axis` specifies the rotation axis in the bone’s local space.

We extend our extras parsing to capture constraint definitions:

struct ConstraintDef {
    enum class Type { NONE, BALL_SOCKET, HINGE };

    Type        type              = Type::NONE;
    float       swing_limit_deg   = 180.0f;   // Ball-socket: cone half-angle
    float       twist_limit_deg   = 180.0f;   // Ball-socket: twist range
    float       hinge_min_deg     = -180.0f;  // Hinge: minimum angle
    float       hinge_max_deg     =  180.0f;  // Hinge: maximum angle
    glm::vec3   hinge_axis        = {0,0,1};  // Hinge: rotation axis in local space
    std::string parent_bone;                  // Name of the parent node
};

ConstraintDef parse_constraint_def(const tinygltf::Value& phys_extras)
{
    ConstraintDef def;
    if (!phys_extras.Has("constraint")) return def;

    const auto& con = phys_extras.Get("constraint");

    const std::string type_str = con.Get("type").Get();
    if      (type_str == "ball_socket") def.type = ConstraintDef::Type::BALL_SOCKET;
    else if (type_str == "hinge")       def.type = ConstraintDef::Type::HINGE;
    else                                return def;

    if (con.Has("swing_limit_deg")) def.swing_limit_deg = static_cast(con.Get("swing_limit_deg").GetNumberAsDouble());
    if (con.Has("twist_limit_deg")) def.twist_limit_deg = static_cast(con.Get("twist_limit_deg").GetNumberAsDouble());
    if (con.Has("limit_min_deg"))   def.hinge_min_deg   = static_cast(con.Get("limit_min_deg").GetNumberAsDouble());
    if (con.Has("limit_max_deg"))   def.hinge_max_deg   = static_cast(con.Get("limit_max_deg").GetNumberAsDouble());

    if (con.Has("hinge_axis")) {
        const auto& ax = con.Get("hinge_axis");
        def.hinge_axis = {
            static_cast(ax.Get(0).GetNumberAsDouble()),
            static_cast(ax.Get(1).GetNumberAsDouble()),
            static_cast(ax.Get(2).GetNumberAsDouble())
        };
    }

    if (con.Has("parent_bone")) def.parent_bone = con.Get("parent_bone").Get();

    return def;
}

With the definitions parsed, we create the actual physics constraints. This happens after all bone bodies have been created, because a constraint must reference two bodies—and both must exist before the constraint can be registered with the physics engine.

void create_ragdoll_constraints(
    const std::vector& nodes,
    const std::map& name_to_node,
    std::vector& bodies,
    std::map& node_to_body,
    PhysicsWorld& physics_world)
{
    for (auto& bone_body : bodies) {
        const Node& node        = nodes[bone_body.node_index];
        const ConstraintDef& con = node.constraint_def;

        if (con.type == ConstraintDef::Type::NONE) continue;
        if (con.parent_bone.empty()) continue;

        // Look up the parent body by name
        auto parent_node_it = name_to_node.find(con.parent_bone);
        if (parent_node_it == name_to_node.end()) continue;

        auto parent_body_it = node_to_body.find(parent_node_it->second);
        if (parent_body_it == node_to_body.end()) continue;

        JPH::BodyID parent_body = parent_body_it->second;
        JPH::BodyID child_body  = bone_body.physics_body;

        if (con.type == ConstraintDef::Type::BALL_SOCKET) {
            physics_world.create_ball_socket_constraint(
                parent_body,
                child_body,
                glm::radians(con.swing_limit_deg),
                glm::radians(con.twist_limit_deg));

        } else if (con.type == ConstraintDef::Type::HINGE) {
            physics_world.create_hinge_constraint(
                parent_body,
                child_body,
                con.hinge_axis,
                glm::radians(con.hinge_min_deg),
                glm::radians(con.hinge_max_deg));
        }
    }
}

There is an important ordering consideration here. The constraints should be created after all bodies are added to the physics world, because some engines (Jolt Physics, for example) require all bodies to be present in the simulation’s broadphase before constraints referencing them can be safely registered.

To give you a starting point, here are reasonable angular limits for a generic humanoid ragdoll. These are approximate biomechanical values from sports medicine literature, slightly loosened so the ragdoll reads as believable without requiring precise tuning:

The shoulder (ball-and-socket) can swing roughly 90 to 100 degrees from neutral and twist around 45 degrees in each direction. The elbow (hinge) flexes from 0 to about 145 degrees, with no meaningful angular freedom in any other axis. The wrist has some lateral deviation (about ±20 degrees) and some flexion/extension (about 70 degrees flexion, 60 degrees extension)—often simplified to a single hinge for ragdoll purposes.

The hip (ball-and-socket) swings about 120 degrees forward, 15 degrees backward, and 45 degrees laterally, with about 45 degrees of axial twist. The knee (hinge) flexes from 0 to about 135 degrees. The ankle has flexion and extension of roughly 50 degrees total, often simplified to a hinge.

The spine is the most complex case. In reality it is a series of small joints, each with a few degrees of freedom. For a ragdoll, it is common to model the spine as two or three ball-and-socket constraints (lower spine to mid-spine, mid-spine to upper spine) each with a small swing limit of about 15 to 20 degrees—enough to allow the spine to curve and crumple, but not enough to allow grotesque folding.

These values are a starting point, not a specification. You will need to tune them for your specific art style and gameplay feel. A stylized action game may want exaggerated ranges. A realistic simulation may need tighter limits derived from biomechanical measurement. The right answer is the one that feels right to play.

[Previous: Bone Proxy Colliders](02_bone_proxy_colliders.html) | [Next: The Ragdoll Handoff](04_ragdoll_handoff.html)
