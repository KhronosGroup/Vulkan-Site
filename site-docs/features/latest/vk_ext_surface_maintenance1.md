# VK_EXT_surface_maintenance1

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_surface_maintenance1.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [1.1. Image Count Query Per Present Mode](#_image_count_query_per_present_mode)
- [1.1._Image_Count_Query_Per_Present_Mode](#_image_count_query_per_present_mode)
- [1.2. Undefined Scaling Behavior](#_undefined_scaling_behavior)
- [1.2._Undefined_Scaling_Behavior](#_undefined_scaling_behavior)
- [1.3. Switching Present Modes](#_switching_present_modes)
- [1.3._Switching_Present_Modes](#_switching_present_modes)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Image Count Query Per Present Mode](#_image_count_query_per_present_mode_2)
- [2.1._Image_Count_Query_Per_Present_Mode](#_image_count_query_per_present_mode_2)
- [2.2. Undefined Scaling Behavior](#_undefined_scaling_behavior_2)
- [2.2._Undefined_Scaling_Behavior](#_undefined_scaling_behavior_2)
- [2.3. Switching Present Modes](#_switching_present_modes_2)
- [2.3._Switching_Present_Modes](#_switching_present_modes_2)
- [3. Proposal](#_proposal)
- [3.1. Image Count Query Per Present Mode](#_image_count_query_per_present_mode_3)
- [3.1._Image_Count_Query_Per_Present_Mode](#_image_count_query_per_present_mode_3)
- [3.2. Undefined Scaling Behavior](#_undefined_scaling_behavior_3)
- [3.2._Undefined_Scaling_Behavior](#_undefined_scaling_behavior_3)
- [3.3. Switching Present Modes](#_switching_present_modes_3)
- [3.3._Switching_Present_Modes](#_switching_present_modes_3)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)

[1.1. Image Count Query Per Present Mode](#_image_count_query_per_present_mode)
[1.2. Undefined Scaling Behavior](#_undefined_scaling_behavior)
[1.3. Switching Present Modes](#_switching_present_modes)

[2. Solution Space](#_solution_space)

[2.1. Image Count Query Per Present Mode](#_image_count_query_per_present_mode_2)
[2.2. Undefined Scaling Behavior](#_undefined_scaling_behavior_2)
[2.3. Switching Present Modes](#_switching_present_modes_2)

[3. Proposal](#_proposal)

[3.1. Image Count Query Per Present Mode](#_image_count_query_per_present_mode_3)
[3.2. Undefined Scaling Behavior](#_undefined_scaling_behavior_3)
[3.3. Switching Present Modes](#_switching_present_modes_3)

[4. Issues](#_issues)

This proposal investigates and addresses a number of practical issues with the
`VK_KHR_surface` specification.

The following is a list of issues considered in this proposal:

* 
Min and max image count as reported in `VkSurfaceCapabilitiesKHR` depend on
present mode.

* 
The scaling behavior of the surface is undefined when the swapchain and
the surface dimensions do not match.

* 
Switching between some present modes technically should not require
recreating the swapchain

The implementation may require a different number of images, as reported in
`VkSurfaceCapabilitiesKHR::minImageCount` and
`VkSurfaceCapabilitiesKHR::maxImageCount` depending on the desired present mode.
However, there is currently no way to specify the present mode when calling
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR`.

Currently, a few of the surface extensions (such as `VK_KHR_xcb_surface` and
`VK_KHR_win32_surface`) require the swapchain’s extents to match the surface’s.
A mismatch between the swapchain and the surface dimensions, as the window is
resized, would result in `VK_ERROR_OUT_OF_DATE_KHR`, which can be undesirable
behavior.
On other surfaces where scaling happens, it is undefined how the image is
scaled.
The image may stretch, scale with fixed aspect ratio, snap to a corner or be
centered.

Certain present modes are compatible, such that a swapchain operating under one
mode can be easily switched to another.
In such a case, recreating the swapchain is undesirable.

See the proposal for `VK_EXT_swapchain_maintenance1` for details.

This issue can be rectified by providing the desired present mode when querying
surface capabilities.

This issue can be resolved by the application querying and opting in to a
specific supported scaling behavior.  Potential behaviors are:

* 
Stretch the swapchain image to the dimensions of the surface

* 
Stretch the swapchain image while maintaining the aspect ratio to fit
within the surface

* 
No scaling applied, and swapchain pixels are mapped one-to-one to the
surface

When the resulting image does not cover the entire surface, additional behavior
can be specified for each of the X and Y axes:

* 
Gravitate to left/top

* 
Gravitate to right/bottom

* 
Center

This extension allows the supported behavior to be queried, while
`VK_EXT_swapchain_maintenance1` would be used to select the desired behavior at
swapchain creation time.

To support the `VK_EXT_swapchain_maintenance1` extension and allow creating
swapchains that may change present modes, it should be possible to query the
set of compatible present modes for this purpose.

This can be done by providing one present mode and querying the list of
compatible present modes from the surface.

Introduced by this API are:

To query the min and max image counts for a specific present mode, chain the
following to `VkPhysicalDeviceSurfaceInfo2KHR` when calling
`vkGetPhysicalDeviceSurfaceCapabilities2KHR`:

typedef struct VkSurfacePresentModeEXT {
    VkStructureType    sType;
    void*              pNext;
    VkPresentModeKHR   presentMode;
} VkSurfacePresentModeEXT;

The returned values in `VkSurfaceCapabilitiesKHR::minImageCount` and
`VkSurfaceCapabilitiesKHR::maxImageCount` would then be specific to the given
present mode.

To query supported scaling behavior, chain `VkSurfacePresentModeEXT` to
`VkPhysicalDeviceSurfaceInfo2KHR` and chain the following to
`VkSurfaceCapabilities2KHR`:

typedef struct VkSurfacePresentScalingCapabilitiesEXT {
    VkStructureType           sType;
    void*                     pNext;
    VkPresentScalingFlagsEXT  supportedPresentScaling;
    VkPresentGravityFlagsEXT  supportedPresentGravityX;
    VkPresentGravityFlagsEXT  supportedPresentGravityY;
    VkExtent2D                minScaledImageExtent;
    VkExtent2D                maxScaledImageExtent;
} VkSurfacePresentScalingCapabilitiesEXT;

Where `VkPresentScalingFlagsEXT` is defined as:

typedef enum VkPresentScalingFlagBitsEXT {
    VK_PRESENT_SCALING_ONE_TO_ONE_BIT_EXT = 0x00000001,
    VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_EXT = 0x00000002,
    VK_PRESENT_SCALING_STRETCH_BIT_EXT = 0x00000004,
} VkPresentScalingFlagBitsEXT;

typedef VkFlags VkPresentScalingFlagsEXT;

And `VkPresentGravityFlagsEXT` is defined as:

typedef enum VkPresentGravityFlagBitsEXT {
    VK_PRESENT_GRAVITY_MIN_BIT_EXT = 0x00000001,
    VK_PRESENT_GRAVITY_MAX_BIT_EXT = 0x00000002,
    VK_PRESENT_GRAVITY_CENTERED_BIT_EXT = 0x00000004,
} VkPresentGravityFlagBitsEXT;

typedef VkFlags VkPresentGravityFlagsEXT;

Note that scaling may not be supported for certain present modes.

The `VK_EXT_swapchain_maintenance1` extension must be used to create a
swapchain with a supported behavior.
Swapchains created with scaling enabled, must use image extents that are
bounded by `minScaledImageExtent` and `maxScaledImageExtent`.

To query the list of compatible present modes with a given present mode for the
purposes of mode switching, chain `VkSurfacePresentModeEXT` to
`VkPhysicalDeviceSurfaceInfo2KHR` and chain the following to
`VkSurfaceCapabilities2KHR`:

typedef struct VkSurfacePresentModeCompatibilityEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           presentModeCount;
    VkPresentMode*     pPresentModes;
} VkSurfacePresentModeCompatibilityEXT;

The implementation will return the count of compatible present modes in
`presentModeCount`, and if provided, the list of them in `pPresentModes`.
