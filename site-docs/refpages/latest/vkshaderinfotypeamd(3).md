# VkShaderInfoTypeAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderInfoTypeAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderInfoTypeAMD - Enum specifying which type of shader information to query

Possible values of [vkGetShaderInfoAMD](vkGetShaderInfoAMD.html)::`infoType`, specifying the
information being queried from a shader, are:

// Provided by VK_AMD_shader_info
typedef enum VkShaderInfoTypeAMD {
    VK_SHADER_INFO_TYPE_STATISTICS_AMD = 0,
    VK_SHADER_INFO_TYPE_BINARY_AMD = 1,
    VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD = 2,
} VkShaderInfoTypeAMD;

* 
[VK_SHADER_INFO_TYPE_STATISTICS_AMD](#) specifies that device resources
used by a shader will be queried.

* 
[VK_SHADER_INFO_TYPE_BINARY_AMD](#) specifies that
implementation-specific information will be queried.

* 
[VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD](#) specifies that human-readable
disassembly of a shader.

[VK_AMD_shader_info](VK_AMD_shader_info.html), [vkGetShaderInfoAMD](vkGetShaderInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkShaderInfoTypeAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
