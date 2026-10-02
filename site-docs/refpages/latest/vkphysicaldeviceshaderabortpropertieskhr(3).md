# VkPhysicalDeviceShaderAbortPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderAbortPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderAbortPropertiesKHR - Structure describing the maximum size of a shader abort message

The `VkPhysicalDeviceShaderAbortPropertiesKHR` structure is defined as:

// Provided by VK_KHR_shader_abort
typedef struct VkPhysicalDeviceShaderAbortPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           maxShaderAbortMessageSize;
} VkPhysicalDeviceShaderAbortPropertiesKHR;

The `VkPhysicalDeviceShaderAbortPropertiesKHR` structure describes the
following:

* 
 `maxShaderAbortMessageSize`
indicates the maximum size of a shader abort message that the
application **can** specify.

If the `VkPhysicalDeviceShaderAbortPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAbortPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceShaderAbortPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ABORT_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_shader_abort](VK_KHR_shader_abort.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderAbortPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
