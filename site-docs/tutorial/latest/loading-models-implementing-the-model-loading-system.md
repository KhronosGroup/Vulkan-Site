# Loading Models: Implementing the Model Loading System

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Loading_Models/03_model_system.html

## Table of Contents

- [1. Implementing the Model Loading System](#_implementing_the_model_loading_system)
- [1._Implementing_the_Model_Loading_System](#_implementing_the_model_loading_system)
- [1.1. Building on glTF Knowledge](#_building_on_gltf_knowledge)
- [1.1._Building_on_glTF_Knowledge](#_building_on_gltf_knowledge)
- [1.2. Setting Up Our Engine’s Model System](#_setting_up_our_engines_model_system)
- [1.2._Setting_Up_Our_Engine’s_Model_System](#_setting_up_our_engines_model_system)
- [1.3. Defining Data Structures](#_defining_data_structures)
- [1.3._Defining_Data_Structures](#_defining_data_structures)
- [1.4. Why We Need a Scene Graph](#_why_we_need_a_scene_graph)
- [1.4._Why_We_Need_a_Scene_Graph](#_why_we_need_a_scene_graph)
- [1.4.1. Benefits of Using a Scene Graph](#_benefits_of_using_a_scene_graph)
- [1.4.1._Benefits_of_Using_a_Scene_Graph](#_benefits_of_using_a_scene_graph)
- [1.4.2. Scene Graphs vs. Simple Collections](#_scene_graphs_vs_simple_collections)
- [1.4.2._Scene_Graphs_vs._Simple_Collections](#_scene_graphs_vs_simple_collections)
- [1.4.3. Scene Graphs vs. Spatial Partitioning Systems (Game Maps)](#_scene_graphs_vs_spatial_partitioning_systems_game_maps)
- [1.4.3._Scene_Graphs_vs._Spatial_Partitioning_Systems_(Game_Maps)](#_scene_graphs_vs_spatial_partitioning_systems_game_maps)
- [1.4.3.1. Common Spatial Partitioning Systems](#_common_spatial_partitioning_systems)
- [1.4.3.1._Common_Spatial_Partitioning_Systems](#_common_spatial_partitioning_systems)
- [1.4.3.2. Spatial Partitioning in Popular Engines](#_spatial_partitioning_in_popular_engines)
- [1.4.3.2._Spatial_Partitioning_in_Popular_Engines](#_spatial_partitioning_in_popular_engines)
- [1.5. Architectural Decisions](#_architectural_decisions)
- [1.5._Architectural_Decisions](#_architectural_decisions)
- [1.6. How Developers Would Use the Model System](#_how_developers_would_use_the_model_system)
- [1.6._How_Developers_Would_Use_the_Model_System](#_how_developers_would_use_the_model_system)
- [1.6.1. Loading and Initializing Models](#_loading_and_initializing_models)
- [1.6.1._Loading_and_Initializing_Models](#_loading_and_initializing_models)
- [1.6.2. Updating and Animating Models](#_updating_and_animating_models)
- [1.6.2._Updating_and_Animating_Models](#_updating_and_animating_models)
- [1.6.3. Rendering Models](#_rendering_models)
- [1.6.3._Rendering_Models](#_rendering_models)
- [1.7. Back to our tutorial](#_back_to_our_tutorial)
- [1.7._Back_to_our_tutorial](#_back_to_our_tutorial)
- [1.8. Implementing a Scene Graph](#_implementing_a_scene_graph)
- [1.8._Implementing_a_Scene_Graph](#_implementing_a_scene_graph)
- [1.9. Animation Structures](#_animation_structures)
- [1.9._Animation_Structures](#_animation_structures)
- [1.10. The Model Class](#_the_model_class)
- [1.10._The_Model_Class](#_the_model_class)
- [1.11. Next Steps: Loading glTF Files](#_next_steps_loading_gltf_files)
- [1.11._Next_Steps:_Loading_glTF_Files](#_next_steps_loading_gltf_files)

## Content

Table of Contents

[1. Implementing the Model Loading System](#_implementing_the_model_loading_system)

[1.1. Building on glTF Knowledge](#_building_on_gltf_knowledge)
[1.2. Setting Up Our Engine’s Model System](#_setting_up_our_engines_model_system)
[1.3. Defining Data Structures](#_defining_data_structures)
[1.4. Why We Need a Scene Graph](#_why_we_need_a_scene_graph)
[1.5. Architectural Decisions](#_architectural_decisions)
[1.6. How Developers Would Use the Model System](#_how_developers_would_use_the_model_system)
[1.7. Back to our tutorial](#_back_to_our_tutorial)
[1.8. Implementing a Scene Graph](#_implementing_a_scene_graph)
[1.9. Animation Structures](#_animation_structures)
[1.10. The Model Class](#_the_model_class)
[1.11. Next Steps: Loading glTF Files](#_next_steps_loading_gltf_files)

As we learned in the [glTF and KTX2 Migration chapter](../../15_GLTF_KTX2_Migration.html), glTF is a modern 3D format that supports a wide range of features including PBR materials, animations, and scene hierarchies. In this chapter, we’ll leverage these capabilities to build a more robust engine.

While the previous chapter covered the basics of loading glTF models, here we’ll focus on organizing the loaded data into a proper scene graph and implementing animation support. This approach will allow us to create more complex and dynamic scenes.

In this chapter, we’ll not only implement the technical aspects of model loading but also discuss the architectural decisions behind our design and how developers can effectively use this system in their applications. Understanding these concepts is crucial for building a maintainable and extensible engine.

We’ll start with the same tinygltf library setup as in the previous chapter:

// Include tinygltf for model loading
#include 

However, instead of just loading the model data directly into vertex and index buffers, we’ll create a more structured approach with proper data classes to represent our scene.

To handle the rich data provided by glTF, we need to define several data structures:

// Vertex structure with position, normal, color, and texture coordinates
struct Vertex {
    glm::vec3 pos;
    glm::vec3 normal;
    glm::vec3 color;
    glm::vec2 texCoord;

    // Binding and attribute descriptions for Vulkan
    static vk::VertexInputBindingDescription getBindingDescription() {
        return { 0, sizeof(Vertex), vk::VertexInputRate::eVertex };
    }

    static std::array getAttributeDescriptions() {
        return {
            vk::VertexInputAttributeDescription( 0, 0, vk::Format::eR32G32B32Sfloat, offsetof(Vertex, pos) ),
            vk::VertexInputAttributeDescription( 1, 0, vk::Format::eR32G32B32Sfloat, offsetof(Vertex, normal) ),
            vk::VertexInputAttributeDescription( 2, 0, vk::Format::eR32G32B32Sfloat, offsetof(Vertex, color) ),
            vk::VertexInputAttributeDescription( 3, 0, vk::Format::eR32G32Sfloat, offsetof(Vertex, texCoord) )
        };
    }

    // Equality operator and hash function for vertex deduplication
    bool operator==(const Vertex& other) const {
        return pos == other.pos && normal == other.normal && color == other.color && texCoord == other.texCoord;
    }
};

// Structure for PBR material properties
struct Material {
    glm::vec4 baseColorFactor = glm::vec4(1.0f);
    float metallicFactor = 1.0f;
    float roughnessFactor = 1.0f;
    glm::vec3 emissiveFactor = glm::vec3(0.0f);

    int baseColorTextureIndex = -1;
    int metallicRoughnessTextureIndex = -1;
    int normalTextureIndex = -1;
    int occlusionTextureIndex = -1;
    int emissiveTextureIndex = -1;
};

// Structure for a mesh with vertices, indices, and material
struct Mesh {
    std::vector vertices;
    std::vector indices;
    int materialIndex = -1;
};

A scene graph is a tree-like data structure that organizes the spatial representation of a graphical scene. While it might seem tempting to use a simple collection or map to store 3D objects, scene graphs offer several critical advantages:

* 
**Hierarchical Transformations**: Scene graphs allow child objects to inherit transformations from their parents. When you move, rotate, or scale a parent node, all its children are automatically transformed relative to the parent. This is essential for complex models like characters where moving the torso should also move the attached limbs.

* 
**Spatial Organization**: Scene graphs organize objects based on their spatial relationships, making it easier to perform operations like culling, collision detection, and level-of-detail management.

* 
**Animation Support**: Hierarchical structures are crucial for skeletal animations, where movements propagate through a chain of bones.

* 
**Scene Management**: Scene graphs facilitate operations like saving/loading scenes, instancing (reusing the same model in different locations), and dynamic scene modifications.

Unlike a simple map or array of objects, a scene graph:

* 
Maintains parent-child relationships between objects

* 
Automatically propagates transformations down the hierarchy

* 
Provides a natural structure for traversal algorithms (rendering, picking, collision)

* 
Supports local-to-global coordinate transformations

For example, with a flat collection of objects, if you wanted to move a character and all its equipment, you’d need to update each piece individually. With a scene graph, you simply move the character node, and all attached equipment moves automatically.

It’s important to distinguish between scene graphs and spatial partitioning systems (often referred to as "game maps" in engine development):

* 
**Scene Graphs** focus on hierarchical relationships and transformations between objects.

* 
**Spatial Partitioning Systems** focus on efficiently organizing objects in space for collision detection, visibility determination, and physics calculations.

While scene graphs organize objects based on logical relationships (like a character and its equipment), spatial partitioning systems organize objects based on their physical location in the game world.

Several spatial partitioning techniques are used in game development:

* 
**Octrees**: Divide 3D space into eight equal octants recursively. Used for large open worlds where objects are distributed unevenly. Octrees adapt to object density, with more subdivisions in crowded areas.

* 
**Binary Space Partitioning (BSP)**: Recursively divides space using planes. Particularly efficient for indoor environments and was popularized by early first-person shooters like Doom and Quake.

* 
**Quadtrees**: The 2D equivalent of octrees, dividing space into four quadrants recursively. Commonly used for 2D games or for terrain in 3D games.

* 
**Axis-Aligned Bounding Boxes (AABB) Trees**: Organize objects based on their bounding boxes, creating a hierarchy that allows for efficient collision checks.

* 
**Portal Systems**: Divide the world into "rooms" connected by "portals." This approach is particularly effective for indoor environments with distinct areas.

* 
**Spatial Hashing**: Maps 3D positions to a hash table, allowing for constant-time lookups of nearby objects. Useful for particle systems and other scenarios with many similar-sized objects.

* 
**Bounding Volume Hierarchies (BVH)**: Create a tree of nested bounding volumes, allowing for efficient ray casting and collision detection.

Different game engines use different spatial partitioning systems, often combining multiple approaches:

* 
**Unreal Engine**: Uses a combination of octrees for the overall world and BSP for detailed indoor environments. Also uses a custom system called "Unreal Visibility Determination" that combines portals and potentially visible sets.

* 
**Unity**: Implements a quadtree/octree hybrid system for its physics and rendering. For navigation, it uses a navigation mesh system.

* 
**CryEngine/CRYENGINE**: Uses octrees for outdoor environments and portal systems for indoor areas.

* 
**Godot**: Employs BVH trees for its physics engine and octrees for rendering.

* 
**Source Engine (Valve)**: Famous for its Binary Space Partitioning (BSP) combined with a portal system called "Potentially Visible Set" (PVS).

* 
**id Tech (id Software)**: Early versions (Doom, Quake) pioneered BSP usage. Later versions use combinations of BSP, octrees, and portal systems.

* 
**Frostbite (EA)**: Uses a hierarchical grid system combined with octrees for its large-scale destructible environments.

In practice, many modern engines use hybrid approaches, selecting the appropriate partitioning system based on the specific needs of different parts of the game world.

When designing our model system, we made several key architectural decisions:

* 
**Node-Based Structure**: We use a node-based approach where each node can have a mesh, transformation, and children. This provides flexibility for complex scene hierarchies.

* 
**Separation of Concerns**: We separate geometric data (vertices, indices) from material properties and transformations, allowing for more efficient memory use and easier updates.

* 
**Animation-Ready**: Our design includes dedicated structures for animations, supporting keyframe interpolation and different animation channels (translation, rotation, scale).

* 
**Memory Management**: We use a centralized ownership model where the Model class owns all nodes, simplifying cleanup and preventing memory leaks.

* 
**Efficient Traversal**: We maintain both a hierarchical structure (`nodes`) and a flat list (`linearNodes`) to support different traversal patterns efficiently.

Here’s how a developer would typically use this model system in their application:

// Create and load a model
Model* characterModel = new Model();
loadFromFile(characterModel, "character.gltf");

// Find specific nodes in the model
Node* headNode = characterModel->findNode("Head");
Node* weaponAttachPoint = characterModel->findNode("RightHand");

// Attach additional objects to the model
Model* weaponModel = new Model();
loadFromFile(weaponModel, "weapon.gltf");
weaponAttachPoint->children.push_back(weaponModel->nodes[0]);

// Play an animation
float deltaTime = 0.016f; // 16ms or ~60 FPS NB: Keep this relative to frame
instead of a constant in actual code as some systems are faster resulting in
faster animation on a constant that isn't tied to the frame time.
characterModel->updateAnimation(0, deltaTime); // Play the first animation

// Manually transform nodes
headNode->rotation = glm::rotate(headNode->rotation, glm::radians(15.0f), glm::vec3(0, 1, 0)); // Look to the side

void renderModel(Model* model, VkCommandBuffer commandBuffer) {
    // Traverse all nodes in the model
    for (auto& node : model->linearNodes) {
        if (node->mesh.indices.size() > 0) {
            // Get the global transformation matrix
            glm::mat4 nodeMatrix = node->getGlobalMatrix();

            // Update uniform buffer with the node's transformation
            updateUniformBuffer(nodeMatrix);

            // Bind the appropriate material
            if (node->mesh.materialIndex >= 0) {
                bindMaterial(model->materials[node->mesh.materialIndex]);
            }

            // Draw the mesh
            vkCmdDrawIndexed(commandBuffer,
                static_cast(node->mesh.indices.size()),
                1, 0, 0, 0);
        }
    }
}

Now that you’ve seen how the model system API is used from a hypothetical
developer’s perspective, it’s time to implement this functionality.
In the following sections, we’ll guide you through implementing the scene
graph, animation system, and model class that will power the engine.

Now let’s look at the implementation of our scene graph structure:

// Structure for a node in the scene graph
struct Node {
    Node* parent = nullptr;
    std::vector children;
    Mesh mesh;
    glm::mat4 matrix = glm::mat4(1.0f);

    // For animation
    glm::vec3 translation = glm::vec3(0.0f);
    glm::quat rotation = glm::quat(1.0f, 0.0f, 0.0f, 0.0f);
    glm::vec3 scale = glm::vec3(1.0f);

    glm::mat4 getLocalMatrix() {
        return glm::translate(glm::mat4(1.0f), translation) *
               glm::toMat4(rotation) *
               glm::scale(glm::mat4(1.0f), scale) *
               matrix;
    }

    glm::mat4 getGlobalMatrix() {
        glm::mat4 m = getLocalMatrix();
        Node* p = parent;
        while (p) {
            m = p->getLocalMatrix() * m;
            p = p->parent;
        }
        return m;
    }
};

To support animations, we need additional structures:

// Structure for animation keyframes
struct AnimationChannel {
    enum PathType { TRANSLATION, ROTATION, SCALE };
    PathType path;
    Node* node = nullptr;
    uint32_t samplerIndex;
};

// Structure for animation interpolation
struct AnimationSampler {
    enum InterpolationType { LINEAR, STEP, CUBICSPLINE };
    InterpolationType interpolation;
    std::vector inputs;  // Key frame timestamps
    std::vector outputsVec4;  // Key frame values (for rotations)
    std::vector outputsVec3;  // Key frame values (for translations and scales)
};

// Structure for animation
struct Animation {
    std::string name;
    std::vector samplers;
    std::vector channels;
    float start = std::numeric_limits::max();
    float end = std::numeric_limits::min();
    float currentTime = 0.0f;
};

Now we can define a Model class that brings everything together:

// Structure for a model with nodes, meshes, materials, textures, and animations
struct Model {
    std::vector nodes;
    std::vector linearNodes;
    std::vector materials;
    std::vector animations;

    ~Model() {
        for (auto node : linearNodes) {
            delete node;
        }
    }

    Node* findNode(const std::string& name) {
        auto nodeIt = std::ranges::find_if(linearNodes, [&name](auto const& node) {
            return node->name == name;
        });
        return (nodeIt != linearNodes.end()) ? *nodeIt : nullptr;
    }

    void updateAnimation(uint32_t index, float deltaTime) {
        assert(!animations.empty() && index  animation.end) {
            animation.currentTime = animation.start;
        }

        for (auto& channel : animation.channels) {
            AnimationSampler& sampler = animation.samplers[channel.samplerIndex];

            // Find the current key frame using binary search
            auto keyFrameIt = std::ranges::lower_bound(sampler.inputs, animation.currentTime);
            if (keyFrameIt != sampler.inputs.end() && keyFrameIt != sampler.inputs.begin()) {
                size_t i = std::distance(sampler.inputs.begin(), keyFrameIt) - 1;
                float t = (animation.currentTime - sampler.inputs[i]) / (sampler.inputs[i + 1] - sampler.inputs[i]);

                    switch (channel.path) {
                        case AnimationChannel::TRANSLATION: {
                            glm::vec3 start = sampler.outputsVec3[i];
                            glm::vec3 end = sampler.outputsVec3[i + 1];
                            channel.node->translation = glm::mix(start, end, t);
                            break;
                        }
                        case AnimationChannel::ROTATION: {
                            glm::quat start = glm::quat(sampler.outputsVec4[i].w, sampler.outputsVec4[i].x, sampler.outputsVec4[i].y, sampler.outputsVec4[i].z);
                            glm::quat end = glm::quat(sampler.outputsVec4[i + 1].w, sampler.outputsVec4[i + 1].x, sampler.outputsVec4[i + 1].y, sampler.outputsVec4[i + 1].z);
                            channel.node->rotation = glm::slerp(start, end, t);
                            break;
                        }
                        case AnimationChannel::SCALE: {
                            glm::vec3 start = sampler.outputsVec3[i];
                            glm::vec3 end = sampler.outputsVec3[i + 1];
                            channel.node->scale = glm::mix(start, end, t);
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
};

Now that we’ve designed our model system’s architecture and implemented the core data structures, the next step is to actually load 3D models from glTF files. In the next chapter, we’ll explore how to parse glTF files using the tinygltf library and populate our scene graph with the loaded data. We’ll learn how to extract meshes, materials, textures, and animations from glTF files and convert them into our engine’s internal representation.

[Previous: Setting Up the Project](02_project_setup.html) | [Next: Loading a glTF Model](04_loading_gltf.html)
