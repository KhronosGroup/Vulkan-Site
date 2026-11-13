# VkPhysicalDeviceInheritedViewportScissorFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceInheritedViewportScissorFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceInheritedViewportScissorFeaturesNV - Structure describing the viewport scissor inheritance behavior for an implementation

The `VkPhysicalDeviceInheritedViewportScissorFeaturesNV` structure is
defined as:

// Provided by VK_NV_inherited_viewport_scissor
typedef struct VkPhysicalDeviceInheritedViewportScissorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           inheritedViewportScissor2D;
} VkPhysicalDeviceInheritedViewportScissorFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `inheritedViewportScissor2D`
indicates whether secondary command buffers can inherit most of the
dynamic state affected by
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html),
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_VIEWPORT](VkDynamicState.html) or [VK_DYNAMIC_STATE_SCISSOR](VkDynamicState.html), from
a primary command buffer.

If the `VkPhysicalDeviceInheritedViewportScissorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceInheritedViewportScissorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInheritedViewportScissorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceInheritedViewportScissorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INHERITED_VIEWPORT_SCISSOR_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_inherited_viewport_scissor](VK_NV_inherited_viewport_scissor.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceInheritedViewportScissorFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
