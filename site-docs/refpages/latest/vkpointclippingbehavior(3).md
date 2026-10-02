# VkPointClippingBehavior(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPointClippingBehavior.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPointClippingBehavior - Enum specifying the point clipping behavior

Possible values of
[VkPhysicalDevicePointClippingProperties](VkPhysicalDevicePointClippingProperties.html)::`pointClippingBehavior`,
specifying clipping behavior of a point primitive whose vertex lies outside
the clip volume, are:

// Provided by VK_VERSION_1_1
typedef enum VkPointClippingBehavior {
    VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES = 0,
    VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY = 1,
  // Provided by VK_KHR_maintenance2
    VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES_KHR = VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES,
  // Provided by VK_KHR_maintenance2
    VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY_KHR = VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY,
} VkPointClippingBehavior;

// Provided by VK_KHR_maintenance2
// Equivalent to VkPointClippingBehavior
typedef VkPointClippingBehavior VkPointClippingBehaviorKHR;

* 
[VK_POINT_CLIPPING_BEHAVIOR_ALL_CLIP_PLANES](#) specifies that the
primitive is discarded if the vertex lies outside any clip plane,
including the planes bounding the view volume.

* 
[VK_POINT_CLIPPING_BEHAVIOR_USER_CLIP_PLANES_ONLY](#) specifies that
the primitive is discarded only if the vertex lies outside any user clip
plane.

[VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevicePointClippingProperties](VkPhysicalDevicePointClippingProperties.html), [VkPhysicalDeviceVulkan11Properties](VkPhysicalDeviceVulkan11Properties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkPointClippingBehavior).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
