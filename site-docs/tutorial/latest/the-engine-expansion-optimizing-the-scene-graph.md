# The Engine Expansion: Optimizing the Scene Graph

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Scene_Graph_Hierarchy/02_engine_expansion.html

## Table of Contents

- [From Simple Instances to a Global Hierarchy](#_from_simple_instances_to_a_global_hierarchy)
- [From_Simple_Instances_to_a_Global_Hierarchy](#_from_simple_instances_to_a_global_hierarchy)
- [The Performance Barrier: Redundant Computation](#_the_performance_barrier_redundant_computation)
- [The_Performance_Barrier:_Redundant_Computation](#_the_performance_barrier_redundant_computation)
- [Understanding the Dirty Flag](#_understanding_the_dirty_flag)
- [Understanding_the_Dirty_Flag](#_understanding_the_dirty_flag)
- [Cache-Friendly Memory: Data-Oriented Design (DOD)](#_cache_friendly_memory_data_oriented_design_dod)
- [Cache-Friendly_Memory:_Data-Oriented_Design_(DOD)](#_cache_friendly_memory_data_oriented_design_dod)
- [The Importance of Order: Topological Sorting](#_the_importance_of_order_topological_sorting)
- [The_Importance_of_Order:_Topological_Sorting](#_the_importance_of_order_topological_sorting)
- [Preparing for the Character Pipeline](#_preparing_for_the_character_pipeline)
- [Preparing_for_the_Character_Pipeline](#_preparing_for_the_character_pipeline)
- [Migrating from the Simple Engine](#_migrating_from_the_simple_engine)
- [Migrating_from_the_Simple_Engine](#_migrating_from_the_simple_engine)

## Content

In the "Building a Simple Engine" series, we managed our world objects using a straightforward `ObjectInstance` vector. Each object had its own position, rotation, and scale, and we rendered them one by one:

struct ObjectInstance {
    glm::vec3 position;
    glm::vec3 rotation;
    glm::vec3 scale;
    // ...
};
std::vector objectInstances;

This approach is perfect for learning the basics of Vulkan, but it creates what we call a **"Shallow World."** In this model, every object is independent. While a model inside an instance could have its own internal glTF hierarchy, the objects in the world couldn’t easily interact with each other.

As we move into advanced character animation, this "shallow" architecture becomes a major roadblock. Imagine a character holding a sword. In a shallow world, the sword and the character are two separate entities. If the character’s hand moves, we have to manually calculate where the sword should be every single frame. This becomes exponentially more difficult when you add holsters, shields, or even multiple characters riding on a moving vehicle.

To solve this, we must replace our flat list with a **Unified Scene Graph**. In this system, every entity in our engine—whether it’s a character’s pelvis bone, a sword, or a massive elevator—is a **Node** in a single, global hierarchy. By giving every node an optional `parent_index`, we allow any object to be attached to any other object. When the parent moves, the children follow automatically.

While a recursive hierarchy is architecturally elegant, it introduces a significant performance challenge. In a traditional scene graph, calculating a node’s "World Matrix" (its final position in the 3D world) requires multiplying its local transform by its parent’s world matrix:

`WorldMatrix = ParentWorldMatrix * LocalMatrix`

In a complex character with a 200-bone skeleton, calculating the world-space position of a fingertip requires traversing the entire hierarchy from the pelvis, through the spine, shoulder, arm, and wrist. If we perform this calculation for every bone, every single frame, we waste a massive amount of CPU cycles—especially if the character isn’t even moving!

To achieve professional-grade performance, we will implement the **Dirty Flag Pattern**.

A "Dirty Flag" is a simple but powerful optimization. Instead of blindly recalculating matrices every frame, we add a small "status" variable to each node. When we change a node’s position, we mark it as **"Dirty."**

We then only perform the expensive matrix multiplications if a node (or its parent) is dirty. If a node is **"Clean,"** we simply reuse the world matrix we calculated in the previous frame.

static constexpr uint32_t INVALID_NODE_INDEX = 0xFFFFFFFF;

enum TransformStatus : uint8_t {
    Clean = 0,
    LocalDirty = 1  child_indices;
    std::string name;

    // Local transform data (SRT: Scale, Rotation, Translation)
    glm::vec3 translation    = {0,0,0};
    glm::quat local_rotation = glm::identity();
    glm::vec3 scale          = {1,1,1};

    // Cached world matrix - we only update this when dirty!
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

    // Computes the local transform matrix from SRT components.
    // The order is TRS (Translation * Rotation * Scale).
    glm::mat4 get_local_matrix() const {
        return glm::translate(glm::mat4(1.0f), translation) *
               glm::mat4_cast(local_rotation) *
               glm::scale(glm::mat4(1.0f), scale);
    }

    // Safely extracts rotation from the world matrix, stripping any scale.
    glm::quat get_world_rotation() const {
        glm::mat3 rot_scale = glm::mat3(world_matrix);
        glm::mat3 rotation;
        // We must normalize the axes to remove scale before converting to a quaternion,
        // otherwise non-uniform scaling will corrupt the rotation data.
        rotation[0] = glm::normalize(rot_scale[0]);
        rotation[1] = glm::normalize(rot_scale[1]);
        rotation[2] = glm::normalize(rot_scale[2]);
        return glm::quat_cast(rotation);
    }
};

This optimization is the difference between an engine that chokes on a few animated characters and one that can handle a whole crowd. By tracking the "dirtiness" of our transforms, we ensure that static environmental objects—which make up the bulk of most scenes—consume almost zero CPU time for transform updates.

How we store these nodes in memory is just as important as the math we use to update them. Traditional scene graphs often use pointers (e.g., `std::vector children`), which leads to **"Pointer Chasing."** When the CPU tries to update the hierarchy, it has to jump to different, unpredictable locations in memory to find each child node. This "random access" is incredibly slow because it misses the CPU’s high-speed cache.

To maximize performance, we will store all of our nodes in a **Flat Data-Oriented Array**. Instead of pointers, we use stable indices (`uint32_t`) to link parents and children.

class SceneGraph {
public:
    std::vector nodes;

    // Linear update: Only works if nodes are topologically sorted (parent before children)
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

    // Recursive update: Correctly handles any node order and sub-tree updates
    void update_world_matrices_subtree(uint32_t index) {
        Node& node = nodes[index];

        if (node.parent_index != INVALID_NODE_INDEX) {
            node.world_matrix = nodes[node.parent_index].world_matrix * node.get_local_matrix();
        } else {
            node.world_matrix = node.get_local_matrix();
        }

        for (uint32_t child_idx : node.child_indices) {
            // We force WorldDirty on children because their parent's matrix just changed
            nodes[child_idx].status |= TransformStatus::WorldDirty;
            update_world_matrices_subtree(child_idx);
        }

        node.status = TransformStatus::Clean;
    }
};

There is a subtle but critical detail in the loop above. For the "parent-to-child" update to work correctly in a single pass, a parent node must **always** appear in the array before its children.

If the pelvis bone is at index 0 and the thigh bone is at index 50, the pelvis will be updated first, its `world_matrix` will be ready, and its "dirty" state will be passed to the thigh. If the order were reversed, the thigh would try to update using the **old** pelvis matrix from the previous frame, leading to a "jittering" effect where the character’s limbs appear to lag behind their bodies.

Ensuring this order is called a **Topological Sort**. By maintaining this specific order in our flat array, we allow the CPU to linearly prefetch node data, resulting in extremely fast, cache-friendly updates that can handle thousands of nodes in a fraction of a millisecond.

This engine expansion isn’t just about rendering performance; it’s about architectural readiness. By implementing a unified, dirty-flag-driven scene graph, we’ve prepared the ground for several advanced features we’ll implement later:

* 
**Skeletal Animation**: Our bones will simply be nodes in this hierarchy.

* 
**Physics Syncing**: We’ll attach physics rigid bodies to specific nodes. When a node’s `world_matrix` becomes dirty, we’ll know exactly when to update the physics proxy.

* 
**Ray Tracing (RTAS)**: Building Acceleration Structures for ray tracing is expensive. Our dirty flags will tell us exactly which BLAS (Bottom-Level Acceleration Structure) needs to be rebuilt because an object moved.

Let’s now move to the next section and look at how we link this visual hierarchy to our physics simulation.

If you are coming from the "Building a Simple Engine" series, you likely have a collection of `ObjectInstance` structs. Transitioning to a unified Scene Graph is a major architectural shift. Here is a migration checklist:

**Switch from Pointers to Indices**: Replace any `Node*` or `Entity*` references with `uint32_t` indices into a global `std::vector`.

**Unify the Storage**: Instead of each `Model` owning its own internal node hierarchy, load all glTF nodes directly into the global `SceneGraph`.

**Adopt the Dirty Flag**: Remove any per-frame `Parent * Local` matrix math from your render loop. Instead, call `update_transforms()` once at the start of your frame.

**Topological Sorting**: When loading a glTF, ensure you add nodes to the `std::vector` in an order where parents always precede their children. This allows the high-speed linear update loop to function correctly.

By making these changes, you move from a collection of independent objects to a cohesive world where every element can react to its parents, setting the stage for complex character interactions.

[Previous: Introduction](01_introduction.html) | [Next: Physics Syncing](03_physics_syncing.html)
