# VkPhysicalDeviceExtendedDynamicStateFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExtendedDynamicStateFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExtendedDynamicStateFeaturesEXT - Structure describing what extended dynamic state can be used

The `VkPhysicalDeviceExtendedDynamicStateFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state
typedef struct VkPhysicalDeviceExtendedDynamicStateFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedDynamicState;
} VkPhysicalDeviceExtendedDynamicStateFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedDynamicState` indicates
that the implementation supports the following dynamic states:

[VK_DYNAMIC_STATE_CULL_MODE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_FRONT_FACE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html)

If the `VkPhysicalDeviceExtendedDynamicStateFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceExtendedDynamicStateFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicStateFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicStateFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceExtendedDynamicStateFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
