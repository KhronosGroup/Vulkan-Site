# VK_AMD_gpu_shader_int16(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_gpu_shader_int16.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_gpu_shader_int16](#VK_AMD_gpu_shader_int16)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecation by VK_KHR_shader_float16_int8](#_deprecation_by_vk_khr_shader_float16_int8)
- [Deprecation_by_VK_KHR_shader_float16_int8](#_deprecation_by_vk_khr_shader_float16_int8)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_gpu_shader_int16 - device extension

**Name String**

`VK_AMD_gpu_shader_int16`

**Extension Type**

Device extension

**Registered Extension Number**

133

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**SPIR-V Dependencies**

* 
[SPV_AMD_gpu_shader_int16](https://github.khronos.org/SPIRV-Registry/extensions/AMD/SPV_AMD_gpu_shader_int16.html)

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html)
extension

Which in turn was *promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Qun Lin [linqun](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_gpu_shader_int16] @linqun%0A*Here describe the issue or question you have about the VK_AMD_gpu_shader_int16 extension*)

**Last Modified Date**

2019-04-11

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_AMD_gpu_shader_int16`](https://registry.khronos.org/OpenGL/extensions/AMD/AMD_gpu_shader_int16.txt)

**Contributors**

* 
Daniel Rakos, AMD

* 
Dominik Witczak, AMD

* 
Matthaeus G. Chajdas, AMD

* 
Rex Xu, AMD

* 
Timothy Lottes, AMD

* 
Zhi Cai, AMD

This extension adds support for using 16-bit integer variables in shaders.

Functionality in this extension is included in the
`[VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html)` extension, when the
[`shaderInt16`](../../../../spec/latest/chapters/features.html#features-shaderInt16) and [`shaderFloat16`](../../../../spec/latest/chapters/features.html#features-shaderFloat16) features are enabled.

* 
`VK_AMD_GPU_SHADER_INT16_EXTENSION_NAME`

* 
`VK_AMD_GPU_SHADER_INT16_SPEC_VERSION`

* 
Revision 2, 2019-04-11 (Tobias Hector)

Marked as deprecated

Revision 1, 2017-06-18 (Dominik Witczak)

* 
First version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_gpu_shader_int16).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
