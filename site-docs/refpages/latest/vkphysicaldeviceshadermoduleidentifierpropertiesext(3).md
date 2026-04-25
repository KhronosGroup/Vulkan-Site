# VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT - Structure describing shader module identifier properties of an implementation

The `VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_shader_module_identifier
typedef struct VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            shaderModuleIdentifierAlgorithmUUID[VK_UUID_SIZE];
} VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT;

The members of the `VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT`
structure describe the following:

* 

`shaderModuleIdentifierAlgorithmUUID` is an array of
[VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t` values which uniquely represents the
algorithm used to compute an identifier in
[vkGetShaderModuleIdentifierEXT](vkGetShaderModuleIdentifierEXT.html) and
[vkGetShaderModuleCreateInfoIdentifierEXT](vkGetShaderModuleCreateInfoIdentifierEXT.html).
Implementations **should** not change this value in different driver
versions if the algorithm used to compute an identifier is the same.

|  | The algorithm UUID may be the same in different ICDs if the algorithms are
| --- | --- |
guaranteed to produce the same results.
This may happen in driver stacks which support different kinds of hardware
with shared code.

Khronos' conformance testing can not guarantee that
`shaderModuleIdentifierAlgorithmUUID` values are actually unique, so
implementors should make their own best efforts to ensure that their UUID is
unlikely to conflict with other implementations which may use a different
algorithm.
In particular, hard-coded values which easily conflict, such as all-`0`
bits, **should** never be used.
Hard-coded values are acceptable if best effort is ensured that the value
will not accidentally conflict. |

If the `VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_shader_module_identifier](VK_EXT_shader_module_identifier.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
