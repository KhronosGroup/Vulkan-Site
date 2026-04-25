# VkPhysicalDeviceVertexAttributeDivisorProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVertexAttributeDivisorProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVertexAttributeDivisorProperties - Structure describing max value of vertex attribute divisor that can be supported by an implementation

The `VkPhysicalDeviceVertexAttributeDivisorProperties` structure is
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVertexAttributeDivisorProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVertexAttribDivisor;
    VkBool32           supportsNonZeroFirstInstance;
} VkPhysicalDeviceVertexAttributeDivisorProperties;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkPhysicalDeviceVertexAttributeDivisorProperties
typedef VkPhysicalDeviceVertexAttributeDivisorProperties VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxVertexAttribDivisor` is the maximum value of the number of
instances that will repeat the value of vertex attribute data when
instanced rendering is enabled.

* 

`supportsNonZeroFirstInstance` specifies whether a non-zero value
for the `firstInstance` parameter of [drawing commands](../../../../spec/latest/chapters/drawing.html#drawing)
is supported when
[VkVertexInputBindingDivisorDescription](VkVertexInputBindingDivisorDescription.html)::`divisor` is not `1`.

If the `VkPhysicalDeviceVertexAttributeDivisorProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexAttributeDivisorProperties-sType-sType) VUID-VkPhysicalDeviceVertexAttributeDivisorProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceVertexAttributeDivisorProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
