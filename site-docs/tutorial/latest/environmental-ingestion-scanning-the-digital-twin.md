# Environmental Ingestion: Scanning the Digital Twin

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/16_Scene_Understanding/02_environmental_ingestion.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Concept: The Digital Twin](#_the_concept_the_digital_twin)
- [The_Concept:_The_Digital_Twin](#_the_concept_the_digital_twin)
- [Accessing Meshes in Vulkan](#_accessing_meshes_in_vulkan)
- [Accessing_Meshes_in_Vulkan](#_accessing_meshes_in_vulkan)
- [Semantic Labels: Meaningful Interaction](#_semantic_labels_meaningful_interaction)
- [Semantic_Labels:_Meaningful_Interaction](#_semantic_labels_meaningful_interaction)
- [Advanced: Real-Time Texture Mapping and Decimation](#_advanced_real_time_texture_mapping_and_decimation)
- [Advanced:_Real-Time_Texture_Mapping_and_Decimation](#_advanced_real_time_texture_mapping_and_decimation)

## Content

To make our virtual objects interact with the physical world, our engine must first capture that world’s geometry. This process is known as **Environmental Ingestion** or **Scene Understanding**. Using OpenXR extensions like `XR_MSFT_scene_understanding` or the cross-vendor **Scene Mesh** functionality, we can bridge the gap between photons and triangles.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Ingesting environmental geometry through OpenXR extensions is a standard way to enable Mixed Reality interactions. You must use these extensions to stream sensor-generated meshes into your Vulkan-mapped buffers to ensure physical and virtual alignment.

Scene understanding turns the messy physical world into a structured **Digital Twin**. The XR runtime uses the headset’s cameras and depth sensors (like **LiDAR**) to build this twin in real-time. This isn’t a static model; it is a dynamic, evolving representation of the user’s environment.

**Spatial Meshing**: The runtime generates a 3D triangle mesh of all visible surfaces in the room. This mesh is updated as the user moves and looks around.

**Semantic Labels**: The runtime categorizes parts of that mesh. Instead of just "triangles," the engine knows: "This is a Floor," "This is a Table," or "This is a Human."

**Plane Detection**: For simpler logic, the runtime identifies large flat surfaces, which are much cheaper to process than full 3D meshes for tasks like placing a virtual lamp.

When we request a scene mesh from OpenXR, we aren’t just getting a one-time blob of data. We are subscribing to a stream of updates. In our engine, we handle this by creating dynamic `vk::raii::Buffer` objects that we update whenever the runtime signals that the environment has changed.

// Querying the scene mesh into Vulkan-mapped buffers using designated initializers
XrSceneMeshBuffersMSFT meshBuffers{
    .type = XR_TYPE_SCENE_MESH_BUFFERS_MSFT,
    .vertexCapacityInput = maxVertices,
    .vertices = reinterpret_cast(*vertexBufferMemory),
    .indexCapacityInput = maxIndices,
    .indices = reinterpret_cast(*indexBufferMemory)
};

// The call that populates our Vulkan-mapped memory from the sensors
xrGetSceneMeshBuffersMSFT(sceneHandle, meshId, &meshBuffers);

Crucially, because this data is dynamic, we must use **Timeline Semaphores** to ensure the GPU doesn’t try to render a spatial mesh while the XR runtime is still updating its vertices.

Semantic labels are the "Intelligence Layer" of scene understanding. Instead of just seeing geometry, our engine can ask: "Give me all surfaces labeled as **FLOOR**." This allows us to implement high-level spatial logic:

* 
**Physics Interaction**: Virtual objects should bounce off tables but pass through "Air."

* 
**AI Navigation**: Characters should only walk on surfaces labeled as "Floor."

* 
**Contextual Occlusion**: If a mesh is labeled as "Wall," we can prioritize it for occlusion tests, ensuring virtual windows don’t render "inside" physical walls.

Vulkan allows us to refine the environmental ingestion beyond standard meshes:

* 
**Real-Time Texture Mapping**: Using Vulkan’s **Video Capture** and **Sampling** extensions, you can use raw camera feeds to project physical room colors onto the scanned geometry in a compute shader, creating a photorealistic "Digital Twin."

* 
**Physics Primitive Decimation**: Runtimes typically provide high-poly meshes. You can use Vulkan **Compute Shaders** to perform real-time mesh decimation, simplifying the OpenXR scan into clean physics primitives (planes/boxes) for more efficient collision detection.

|  | For more details, consult the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#scene_understanding), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_zero_copy_hand_off.html)
