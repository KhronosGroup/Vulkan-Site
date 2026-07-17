# Projector-Based Spatial Architecture

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/12_CAVE_Architecture/02_projector_based_spatial_tech.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Observer Paradox: One Perspective, Many Screens](#_the_observer_paradox_one_perspective_many_screens)
- [The_Observer_Paradox:_One_Perspective,_Many_Screens](#_the_observer_paradox_one_perspective_many_screens)
- [Calculating the Off-Axis Frustum](#_calculating_the_off_axis_frustum)
- [Calculating_the_Off-Axis_Frustum](#_calculating_the_off_axis_frustum)
- [The Distributed Rendering Model: Leader and Follower](#_the_distributed_rendering_model_leader_and_follower)
- [The_Distributed_Rendering_Model:_Leader_and_Follower](#_the_distributed_rendering_model_leader_and_follower)
- [Advanced: Multi-Device Sync and Color Balancing](#_advanced_multi_device_sync_and_color_balancing)
- [Advanced:_Multi-Device_Sync_and_Color_Balancing](#_advanced_multi_device_sync_and_color_balancing)
- [Determinism is Mandatory](#_determinism_is_mandatory)
- [Determinism_is_Mandatory](#_determinism_is_mandatory)

## Content

When transitioning from a headset to a **CAVE** (Cave Automatic Virtual Environment), the "cameras" become fixed physical surfaces—the walls—and the user moves **within** them. This requires highly specialized **Off-Axis Projection** logic.

This chapter falls under the category: **Beyond the OpenXR Standard**.

Standard HMD runtimes are not designed for fixed-surface CAVE environments. You use Vulkan’s low-level control over frustums and multi-device synchronization to implement these specialized spatial architectures, often bypassing standard HMD tracking models in favor of custom cluster-based rendering.

To understand CAVE rendering, you must accept a paradox: **The 3D scene is only correct for one person.**

Because the physical walls are fixed, if the user moves to the left, the image on the front wall must be skewed to maintain the illusion of depth from their new perspective. This is known as **Off-Axis Projection**.

**Fixed Display**: The projection surface (the wall) never moves.

**Moving Eye**: The user’s eye (the viewpoint) moves constantly.

**Result**: The "Pyramid of Vision" (the frustum) is highly asymmetric and changes its skew every frame based on the user’s location.

To calculate this, we treat the physical wall as the "Near Plane" of our camera. We calculate the frustum that passes from the tracked eye through the four corners of the wall.

// A representation of a physical projection wall in our engine using designated initializers
struct ProjectionWall {
    glm::vec3 bottomLeft;
    glm::vec3 bottomRight;
    glm::vec3 topLeft;
};

// Configure the rendering info for a specific wall view
vk::RenderingInfo wallRenderingInfo{
    .renderArea = {{0, 0}, {wallWidth, wallHeight}},
    .layerCount = 1,
    .colorAttachmentCount = 1,
    .pColorAttachments = &colorAttachment
};

The runtime (or a wrapper like Monado) ensures each node only renders the specific `viewID` it is responsible for, while correcting for projector keystoning via a "Warp and Blend" mesh.

Driving a 5-sided CAVE at 4K resolution requires immense GPU power, typically using a **Cluster** of computers.

* 
**Leader Node**: Runs the main simulation, physics, and input processing, broadcasting the world state to followers.

* 
**Follower Nodes**: Perform **Deterministic Simulation**, updating their world state to match the leader and rendering only their assigned wall.

Vulkan allows for a level of coordination that standard XR APIs do not natively manage:

* 
**Multi-Device Buffer Swaps**: Using Vulkan’s **External Semaphores** and **Fences**, you can synchronize rendering across a multi-GPU projector cluster, ensuring all GPUs swap buffers at the exact same hardware clock cycle.

* 
**Global Illuminant Consistency**: You can use Vulkan’s **Query Pools** to sample the brightness of each projector and dynamically adjust your engine’s lighting, ensuring a uniform visual environment across all walls.

In a cluster, every computer must agree on the world state. If a particle system uses a random seed that differs between nodes, the immersion breaks. Every "Random" or "Time-based" element must be synchronized across the network.

|  | For more information on CAVE and large-scale spatial systems, consult the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#spaces), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_hardware_sync.html)
