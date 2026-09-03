# VkShaderModuleIdentifierEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderModuleIdentifierEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderModuleIdentifierEXT - A unique identifier for a shader module

[VkShaderModuleIdentifierEXT](#) represents a shader module identifier
returned by the implementation.

// Provided by VK_EXT_shader_module_identifier
typedef struct VkShaderModuleIdentifierEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           identifierSize;
    uint8_t            identifier[VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT];
} VkShaderModuleIdentifierEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`identifierSize` is the size, in bytes, of valid data returned in
`identifier`.

* 
`identifier` is a buffer of opaque data specifying an identifier.

Any returned values beyond the first `identifierSize` bytes are
**undefined**.
Implementations **must** return an `identifierSize` greater than 0, and
less-or-equal to [VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT](VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT.html).

Two identifiers are considered equal if `identifierSize` is equal and
the first `identifierSize` bytes of `identifier` compare equal.

Implementations **may** return a different `identifierSize` for different
modules.
Implementations **should** ensure that `identifierSize` is large enough to
uniquely define a shader module.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderModuleIdentifierEXT-sType-sType) VUID-VkShaderModuleIdentifierEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_MODULE_IDENTIFIER_EXT](VkStructureType.html)

* 
[](#VUID-VkShaderModuleIdentifierEXT-pNext-pNext) VUID-VkShaderModuleIdentifierEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_shader_module_identifier](VK_EXT_shader_module_identifier.html), [VkStructureType](VkStructureType.html), [vkGetShaderModuleCreateInfoIdentifierEXT](vkGetShaderModuleCreateInfoIdentifierEXT.html), [vkGetShaderModuleIdentifierEXT](vkGetShaderModuleIdentifierEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderModuleIdentifierEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
