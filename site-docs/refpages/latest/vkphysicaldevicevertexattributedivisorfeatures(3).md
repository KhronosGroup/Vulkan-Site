# VkPhysicalDeviceVertexAttributeDivisorFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVertexAttributeDivisorFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVertexAttributeDivisorFeatures - Structure describing if fetching of vertex attribute may be repeated for instanced rendering

The `VkPhysicalDeviceVertexAttributeDivisorFeatures` structure is
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVertexAttributeDivisorFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexAttributeInstanceRateDivisor;
    VkBool32           vertexAttributeInstanceRateZeroDivisor;
} VkPhysicalDeviceVertexAttributeDivisorFeatures;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkPhysicalDeviceVertexAttributeDivisorFeatures
typedef VkPhysicalDeviceVertexAttributeDivisorFeatures VkPhysicalDeviceVertexAttributeDivisorFeaturesKHR;

// Provided by VK_EXT_vertex_attribute_divisor
// Equivalent to VkPhysicalDeviceVertexAttributeDivisorFeatures
typedef VkPhysicalDeviceVertexAttributeDivisorFeatures VkPhysicalDeviceVertexAttributeDivisorFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`vertexAttributeInstanceRateDivisor` specifies whether vertex
attribute fetching may be repeated in the case of instanced rendering.

* 

`vertexAttributeInstanceRateZeroDivisor` specifies whether a zero
value for [VkVertexInputBindingDivisorDescriptionEXT](VkVertexInputBindingDivisorDescription.html)::`divisor`
is supported.

If the `VkPhysicalDeviceVertexAttributeDivisorFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVertexAttributeDivisorFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexAttributeDivisorFeatures-sType-sType) VUID-VkPhysicalDeviceVertexAttributeDivisorFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html), [VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVertexAttributeDivisorFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
