# Appendix: Common Types Reference

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/appendix_types.html

## Table of Contents

- [Core Scene Graph Types](#_core_scene_graph_types)
- [Core_Scene_Graph_Types](#_core_scene_graph_types)
- [Animation & Skinning Types](#_animation_skinning_types)
- [Animation_&_Skinning_Types](#_animation_skinning_types)
- [Physics Types](#_physics_types)
- [IK & Procedural Types](#_ik_procedural_types)
- [IK_&_Procedural_Types](#_ik_procedural_types)

## Content

This appendix provides authoritative, consolidated definitions for the shared types and interfaces used throughout the Advanced glTF series.

static constexpr uint32_t INVALID_NODE_INDEX = 0xFFFFFFFF;

enum TransformStatus : uint8_t {
    Clean      = 0,
    LocalDirty = 1  child_indices;
    std::string name;

    // Local transform data (SRT: Scale, Rotation, Translation)
    glm::vec3 translation    = {0,0,0};
    glm::quat local_rotation = glm::identity();
    glm::vec3 scale          = {1,1,1};

    // Cached world matrix
    glm::mat4 world_matrix = glm::mat4(1.0f);

    uint8_t status = TransformStatus::Clean;
    bool is_joint = false;

    // Physics metadata (extracted from glTF extras)
    ColliderDef collider_def;
    ConstraintDef constraint_def;

    // Call this whenever you change translation, rotation, or scale
    void mark_dirty() {
        status |= TransformStatus::LocalDirty | TransformStatus::WorldDirty;
    }

    // Computes the local transform matrix from SRT components (TRS order)
    glm::mat4 get_local_matrix() const {
        return glm::translate(glm::mat4(1.0f), translation) *
               glm::mat4_cast(local_rotation) *
               glm::scale(glm::mat4(1.0f), scale);
    }

    // Safely extracts rotation from the world matrix, stripping any scale.
    glm::quat get_world_rotation() const {
        glm::mat3 rot_scale = glm::mat3(world_matrix);
        glm::mat3 rotation;
        rotation[0] = glm::normalize(rot_scale[0]);
        rotation[1] = glm::normalize(rot_scale[1]);
        rotation[2] = glm::normalize(rot_scale[2]);
        return glm::quat_cast(rotation);
    }
};

class SceneGraph {
public:
    std::vector nodes;

    // Linear update: Only works if nodes are topologically sorted
    void update_transforms() {
        for (auto& node : nodes) {
            if (node.status & TransformStatus::WorldDirty) {
                if (node.parent_index != INVALID_NODE_INDEX) {
                    node.world_matrix = nodes[node.parent_index].world_matrix * node.get_local_matrix();
                } else {
                    node.world_matrix = node.get_local_matrix();
                }

                for (uint32_t child_index : node.child_indices) {
                    nodes[child_index].status |= TransformStatus::WorldDirty;
                }
                node.status = TransformStatus::Clean;
            }
        }
    }

    // Recursive update: Handles any node order and sub-tree updates
    void update_world_matrices_subtree(uint32_t index) {
        Node& node = nodes[index];
        if (node.parent_index != INVALID_NODE_INDEX) {
            node.world_matrix = nodes[node.parent_index].world_matrix * node.get_local_matrix();
        } else {
            node.world_matrix = node.get_local_matrix();
        }
        for (uint32_t child_idx : node.child_indices) {
            nodes[child_idx].status |= TransformStatus::WorldDirty;
            update_world_matrices_subtree(child_idx);
        }
        node.status = TransformStatus::Clean;
    }
};

// Free-function helper for recursive subtree updates (matches IK chapter usage)
inline void update_world_matrices_subtree(std::vector& nodes, uint32_t index) {
    Node& node = nodes[index];
    if (node.parent_index != INVALID_NODE_INDEX) {
        node.world_matrix = nodes[node.parent_index].world_matrix * node.get_local_matrix();
    } else {
        node.world_matrix = node.get_local_matrix();
    }
    for (uint32_t child_idx : node.child_indices) {
        nodes[child_idx].status |= TransformStatus::WorldDirty;
        update_world_matrices_subtree(nodes, child_idx);
    }
    node.status = TransformStatus::Clean;
}

enum InterpolationMode { STEP, LINEAR, CUBICSPLINE };

struct AnimationSampler {
    InterpolationMode interpolation = LINEAR;
    std::vector inputs;              // Timestamps in seconds
    std::vector outputs_raw;     // Packed: for CUBICSPLINE stores in_tan/value/out_tan triples

    // For CUBICSPLINE, we split the raw data for easier interpolation
    std::vector in_tangents;
    std::vector values;
    std::vector out_tangents;
};

struct AnimationChannel {
    enum PathType { TRANSLATION, ROTATION, SCALE, WEIGHTS };
    PathType path;
    uint32_t node_index;
    uint32_t sampler_index;
};

struct Pose {
    std::vector translations;
    std::vector rotations;
    std::vector scales;
};

// Matches the glTF skin object.
struct Skin {
    std::string              name;
    std::vector    joints;                // Node indices, one per joint
    std::vector   inverse_bind_matrices; // One per joint
    uint32_t                 skeleton_root = INVALID_NODE_INDEX;
};

// Binary search for the keyframe index corresponding to time
uint32_t find_keyframe(const AnimationSampler& sampler, float time) {
    if (sampler.inputs.size() (std::distance(sampler.inputs.begin(), it));
    return (idx > 0) ? idx - 1 : 0;
}

// Pre-computes joint matrices (JointWorldMatrix * InverseBindMatrix) for GPU upload.
// Call after animation update and scene graph update, once per frame.
void compute_joint_matrices(
    const Skin&              skin,
    const std::vector& nodes,
    std::vector&  joint_matrices_out)
{
    joint_matrices_out.resize(skin.joints.size());
    for (size_t i = 0; i & nodes, const Pose& pose, const std::vector& joint_indices) {
    for (size_t i = 0; i 

struct PhysicsPose {
    glm::vec3 position;
    glm::quat orientation;

    glm::mat4 to_matrix() const {
        return glm::translate(glm::mat4(1.0f), position) * glm::mat4_cast(orientation);
    }
};

class PhysicsWorld {
public:
    virtual ~PhysicsWorld() = default;

    // Global lifecycle
    static void global_init();
    static void global_shutdown();
    static std::unique_ptr create();

    // Body management
    virtual JPH::BodyID create_body(const JPH::BodyCreationSettings& settings) = 0;
    virtual void        destroy_body(JPH::BodyID body_id) = 0;
    virtual void        set_motion_type(JPH::BodyID body_id, JPH::EMotionType type) = 0;
    virtual void        set_object_layer(JPH::BodyID body_id, uint16_t layer) = 0;
    virtual void        activate_body(JPH::BodyID body_id) = 0;

    // Kinematic/dynamic sync
    virtual void        move_kinematic(JPH::BodyID body_id, const PhysicsPose& pose) = 0;
    virtual PhysicsPose get_body_pose(JPH::BodyID body_id) const = 0;
    virtual glm::vec3   get_linear_velocity(JPH::BodyID body_id) const = 0;
    virtual void        set_linear_velocity(JPH::BodyID body_id, const glm::vec3& velocity) = 0;

    // Constraints (angles in radians)
    virtual void create_ball_socket_constraint(JPH::BodyID p1, JPH::BodyID p2,
                                               float swing_rad, float twist_rad) = 0;
    virtual void create_hinge_constraint(JPH::BodyID p1, JPH::BodyID p2,
                                         const glm::vec3& axis,
                                         float min_angle_rad, float max_angle_rad) = 0;

    // Simulation
    virtual void step(float delta_seconds) = 0;

    // Queries
    virtual bool raycast(const glm::vec3& origin, const glm::vec3& direction, float max_distance,
                         float& out_distance, glm::vec3& out_normal,
                         JPH::BodyID& out_body_id) const = 0;
};

struct IKChain {
    std::vector joints;  // Ordered from root to end effector
    uint32_t effector_node;        // The node whose position we are trying to place
    float    threshold;            // Convergence threshold in world-space units
    int      max_iterations;       // Safety cap
    glm::vec3 target_world;        // Target position
    glm::vec3 pole_vector;         // For algorithms like FABRIK or constrained CCD
};
