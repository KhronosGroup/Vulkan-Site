# VK_INTEL_shader_integer_functions2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_INTEL_shader_integer_functions2.html

## Table of Contents

- [Name](#_name)
- [VK_INTEL_shader_integer_functions2](#VK_INTEL_shader_integer_functions2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_INTEL_shader_integer_functions2 - device extension

**Name String**

`VK_INTEL_shader_integer_functions2`

**Extension Type**

Device extension

**Registered Extension Number**

210

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_INTEL_shader_integer_functions2](https://github.khronos.org/SPIRV-Registry/extensions/INTEL/SPV_INTEL_shader_integer_functions2.html)

**Contact**

* 
Ian Romanick [ianromanick](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_INTEL_shader_integer_functions2] @ianromanick%0A*Here describe the issue or question you have about the VK_INTEL_shader_integer_functions2 extension*)

**Last Modified Date**

2019-04-30

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_INTEL_shader_integer_functions2`](https://registry.khronos.org/OpenGL/extensions/INTEL/INTEL_shader_integer_functions2.txt).

**Contributors**

* 
Ian Romanick, Intel

* 
Ben Ashbaugh, Intel

This extension adds support for several new integer instructions in SPIR-V
for use in graphics shaders.
Many of these instructions have pre-existing counterparts in the Kernel
environment.

The added integer functions are defined by the
[`SPV_INTEL_shader_integer_functions2`](https://github.khronos.org/SPIRV-Registry/extensions/INTEL/SPV_INTEL_shader_integer_functions2.html)
SPIR-V extension and can be used with the
`GL_INTEL_shader_integer_functions2` GLSL extension.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL](VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL.html)

* 
`VK_INTEL_SHADER_INTEGER_FUNCTIONS_2_EXTENSION_NAME`

* 
`VK_INTEL_SHADER_INTEGER_FUNCTIONS_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_FUNCTIONS_2_FEATURES_INTEL](VkStructureType.html)

* 
[    `IntegerFunctions2INTEL`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-IntegerFunctions2INTEL)

* 
Revision 1, 2019-04-30 (Ian Romanick)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_INTEL_shader_integer_functions2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
