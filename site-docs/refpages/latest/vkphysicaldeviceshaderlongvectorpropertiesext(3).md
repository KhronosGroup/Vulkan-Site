# VkPhysicalDeviceShaderLongVectorPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderLongVectorPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderLongVectorPropertiesEXT - Structure describing long vector properties supported by an implementation

The `VkPhysicalDeviceShaderLongVectorPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_shader_long_vector
typedef struct VkPhysicalDeviceShaderLongVectorPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVectorComponents;
} VkPhysicalDeviceShaderLongVectorPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxVectorComponents` indicates the
maximum number of components that **can** be in a vector type.

If the `VkPhysicalDeviceShaderLongVectorPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderLongVectorPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderLongVectorPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_shader_long_vector](VK_EXT_shader_long_vector.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderLongVectorPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
