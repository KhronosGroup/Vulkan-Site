# Space Manifolds

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/07_Action_Spaces_Input/03_space_manifolds.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [Virtual Coordinate Systems: The Action Space](#_virtual_coordinate_systems_the_action_space)
- [Virtual_Coordinate_Systems:_The_Action_Space](#_virtual_coordinate_systems_the_action_space)
- [Space Manifolds: From Quaternions to Matrices](#_space_manifolds_from_quaternions_to_matrices)
- [Space_Manifolds:_From_Quaternions_to_Matrices](#_space_manifolds_from_quaternions_to_matrices)
- [Advanced: Collision-Aware Posing and Smoothing](#_advanced_collision_aware_posing_and_smoothing)
- [Advanced:_Collision-Aware_Posing_and_Smoothing](#_advanced_collision_aware_posing_and_smoothing)
- [Why We Use "App Space"](#_why_we_use_app_space)
- [Why_We_Use_"App_Space"](#_why_we_use_app_space)

## Content

While most input actions result in discrete events (like a button press), pose actions are special: they are inherently spatial. To bridge the gap between the user’s hand movement and the objects in our 3D engine, we need to create an **Action Space**.

This chapter falls under the category: **Using Vulkan with an OpenXR Runtime**.

Defining input through an action-based system and managing spatial coordinate systems (Action Spaces) is a mandatory architectural pattern in OpenXR. You must use these abstractions to ensure your application can run on the wide variety of controllers supported by the OpenXR ecosystem.

Think of an action space as a virtual coordinate system that "follows" the user’s hand. In OpenXR, all spatial tracking is relative. To find where a hand is, we must ask: "Where is this Hand Space relative to my World Space?"

**Grip Pose**: The location of the user’s palm. Used for holding virtual objects.

**Aim Pose**: A ray extending from the controller’s front. Used for pointing and UI interaction.

// 1. Create a Space for our Hand Pose Action using designated initializers
XrActionSpaceCreateInfo actionSpaceInfo{
    .type = XR_TYPE_ACTION_SPACE_CREATE_INFO,
    .action = handPoseAction,
    .poseInActionSpace = identityPose // Can be used to apply a fixed offset
};

XrSpace handSpace;
xrCreateActionSpace(session, &actionSpaceInfo, &handSpace);

The runtime handles the world alignment and latency compensation for these spaces, ensuring that the "Hand Space" stays stable relative to the physical sensors.

Every frame, we use `xrLocateSpace` to find the hand’s location. The runtime provides this as an `XrSpaceLocation`, containing a position and an orientation.

Our Vulkan shaders expect a **4x4 Matrix**. This conversion is the "Space Manifold"—mapping the 7D tracking data into the 16D matrix format used by the GPU.

// 2. Locate the hand space relative to the world coordinate system
XrSpaceLocation location{
    .type = XR_TYPE_SPACE_LOCATION
};
xrLocateSpace(handSpace, worldSpace, predictedDisplayTime, &location);

if (location.locationFlags & XR_SPACE_LOCATION_ORIENTATION_VALID_BIT) {
    // 3. Convert XrPosef to a 4x4 transformation matrix
    vk::mat4 handTransform = xrPoseToMatrix(location.pose);

    // Pass this matrix to our engine's scene graph or directly to a shader
    pushConstants.modelMatrix = handTransform;
}

Vulkan allows you to refine these poses beyond the raw tracking data provided by OpenXR:

* 
**Collision-Aware Posing**: By uploading your scene’s bounding volumes to the GPU using **Structured Buffers**, you can use Vulkan to "clamp" the OpenXR-provided poses in real-time, preventing virtual hands from clipping through walls.

* 
**Temporal Smoothing**: While the runtime filters sensor noise, you can use Vulkan’s **Subgroup Operations** to implement highly efficient temporal smoothing or a predictive "heavy" feel for virtual objects.

In spatial computing, the **App Space** (or Stage Space) is the origin of our virtual world. By locating the `handSpace` relative to the `worldSpace`, we ensure that if the user walks around their room, the virtual hand stays perfectly aligned with their physical hand relative to the virtual environment.

This transformation process turns a physical controller into a virtual object that moves through our world’s coordinate system. Whether the user is pointing a laser or simply waving, the engine sees it all as a single, consistent matrix.

|  | For more details, consult the official [OpenXR Specification](https://registry.khronos.org/OpenXR/specs/1.1/html/xpspec.html#spaces), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_openxr_action_system.html) | [Next](04_incorporating_into_the_engine.html)
