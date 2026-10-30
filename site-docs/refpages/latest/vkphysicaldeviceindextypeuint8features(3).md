# VkPhysicalDeviceIndexTypeUint8Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceIndexTypeUint8Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceIndexTypeUint8Features - Structure describing whether uint8 index type can be used

The `VkPhysicalDeviceIndexTypeUint8Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceIndexTypeUint8Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           indexTypeUint8;
} VkPhysicalDeviceIndexTypeUint8Features;

// Provided by VK_KHR_index_type_uint8
// Equivalent to VkPhysicalDeviceIndexTypeUint8Features
typedef VkPhysicalDeviceIndexTypeUint8Features VkPhysicalDeviceIndexTypeUint8FeaturesKHR;

// Provided by VK_EXT_index_type_uint8
// Equivalent to VkPhysicalDeviceIndexTypeUint8Features
typedef VkPhysicalDeviceIndexTypeUint8Features VkPhysicalDeviceIndexTypeUint8FeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `indexTypeUint8`
    indicates that [VK_INDEX_TYPE_UINT8](VkIndexType.html) can be used with
[vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html) and
    [vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html).

If the `VkPhysicalDeviceIndexTypeUint8Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceIndexTypeUint8Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceIndexTypeUint8Features-sType-sType) VUID-VkPhysicalDeviceIndexTypeUint8Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_index_type_uint8](VK_EXT_index_type_uint8.html), [VK_KHR_index_type_uint8](VK_KHR_index_type_uint8.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceIndexTypeUint8Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
