# VK_EXT_shader_long_vector(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_long_vector.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_long_vector](#VK_EXT_shader_long_vector)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_long_vector - device extension

**Name String**

`VK_EXT_shader_long_vector`

**Extension Type**

Device extension

**Registered Extension Number**

636

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**API Interactions**

* 
Interacts with VK_KHR_workgroup_memory_explicit_layout

**SPIR-V Dependencies**

* 
[SPV_EXT_long_vector](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_long_vector.html)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_long_vector] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_shader_long_vector extension*)

**Extension Proposal**

[VK_EXT_shader_long_vector](../../../../features/latest/features/proposals/VK_EXT_shader_long_vector.html)

**Last Modified Date**

2025-06-24

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_EXT_long_vector`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_long_vector.html)

* 
This extension provides API support for
[`GL_EXT_long_vector`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_long_vector.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Spencer Fricke, LunarG

This extension adds support for using vector types with more than four
components in SPIR-V.

Long vector types are defined by the
[`SPV_EXT_long_vector`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_long_vector.html) SPIR-V extension
and can be used with the
[`GL_EXT_long_vector`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_long_vector.txt) GLSL
extension.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderLongVectorFeaturesEXT](VkPhysicalDeviceShaderLongVectorFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderLongVectorPropertiesEXT](VkPhysicalDeviceShaderLongVectorPropertiesEXT.html)

* 
`VK_EXT_SHADER_LONG_VECTOR_EXTENSION_NAME`

* 
`VK_EXT_SHADER_LONG_VECTOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_PROPERTIES_EXT](VkStructureType.html)

* 
[LongVectorEXT](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-LongVectorEXT)

* 
Revision 1, 2025-06-24 (Jeff Bolz)

Initial revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_long_vector).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
