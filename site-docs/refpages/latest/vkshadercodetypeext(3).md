# VkShaderCodeTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderCodeTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderCodeTypeEXT - Indicate a shader code type

Shader objects **can** be created using different types of shader code.
Possible values of [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)::`codeType`, are:

// Provided by VK_EXT_shader_object
typedef enum VkShaderCodeTypeEXT {
    VK_SHADER_CODE_TYPE_BINARY_EXT = 0,
    VK_SHADER_CODE_TYPE_SPIRV_EXT = 1,
} VkShaderCodeTypeEXT;

* 
[VK_SHADER_CODE_TYPE_BINARY_EXT](#) specifies shader code in an opaque,
implementation-defined binary format specific to the physical device.

* 
[VK_SHADER_CODE_TYPE_SPIRV_EXT](#) specifies shader code in SPIR-V
format.

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderCodeTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
