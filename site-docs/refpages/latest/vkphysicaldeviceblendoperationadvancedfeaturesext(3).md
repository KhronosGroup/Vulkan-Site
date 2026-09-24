# VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT - Structure describing advanced blending features that can be supported by an implementation

The `VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_blend_operation_advanced
typedef struct VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           advancedBlendCoherentOperations;
} VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`advancedBlendCoherentOperations` specifies whether blending using
[advanced blend operations](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced) is guaranteed
to execute atomically and in [primitive    order](../../../../spec/latest/chapters/drawing.html#drawing-primitive-order).
If this is [VK_TRUE](VK_TRUE.html),
[VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits.html) is treated the
same as [VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits.html), and advanced blending
needs no additional synchronization over basic blending.
If this is [VK_FALSE](VK_FALSE.html), then memory dependencies are required to
guarantee order between two advanced blending operations that occur on
the same sample.

If the `VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
