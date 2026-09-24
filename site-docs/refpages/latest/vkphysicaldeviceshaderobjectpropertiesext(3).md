# VkPhysicalDeviceShaderObjectPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderObjectPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderObjectPropertiesEXT - Structure describing shader object properties supported by an implementation

The `VkPhysicalDeviceShaderObjectPropertiesEXT` structure is defined as:

// Provided by VK_EXT_shader_object
typedef struct VkPhysicalDeviceShaderObjectPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            shaderBinaryUUID[VK_UUID_SIZE];
    uint32_t           shaderBinaryVersion;
} VkPhysicalDeviceShaderObjectPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderBinaryUUID` is an array of
[VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t` values representing a universally unique
identifier for one or more implementations whose shader binaries are
guaranteed to be compatible with each other.

* 
 `shaderBinaryVersion` is an unsigned
integer incremented to represent backwards compatible differences
between implementations with the same `shaderBinaryUUID`.

The purpose and usage of the values of this structure are described in
greater detail in [Binary Shader Compatibility](../../../../spec/latest/chapters/shaders.html#shaders-objects-binary-compatibility).

If the `VkPhysicalDeviceShaderObjectPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderObjectPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderObjectPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderObjectPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
