# VkPhysicalDeviceExtendedDynamicState2FeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExtendedDynamicState2FeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExtendedDynamicState2FeaturesEXT - Structure describing what extended dynamic state can be used

The `VkPhysicalDeviceExtendedDynamicState2FeaturesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state2
typedef struct VkPhysicalDeviceExtendedDynamicState2FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedDynamicState2;
    VkBool32           extendedDynamicState2LogicOp;
    VkBool32           extendedDynamicState2PatchControlPoints;
} VkPhysicalDeviceExtendedDynamicState2FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedDynamicState2` indicates
that the implementation supports the following dynamic states:

[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html)

`extendedDynamicState2LogicOp` indicates that the implementation
supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html)

`extendedDynamicState2PatchControlPoints` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html)

If the `VkPhysicalDeviceExtendedDynamicState2FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceExtendedDynamicState2FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicState2FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicState2FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_2_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceExtendedDynamicState2FeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
