# VK_KHR_shader_float_controls2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_float_controls2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_float_controls2](#VK_KHR_shader_float_controls2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_float_controls2 - device extension

**Name String**

`VK_KHR_shader_float_controls2`

**Extension Type**

Device extension

**Registered Extension Number**

529

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_shader_float_controls](VK_KHR_shader_float_controls.html)

**SPIR-V Dependencies**

* 
[SPV_KHR_float_controls2](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_float_controls2.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Graeme Leese [gnl21](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_float_controls2] @gnl21%0A*Here describe the issue or question you have about the VK_KHR_shader_float_controls2 extension*)

**Extension Proposal**

[VK_KHR_shader_float_controls2](../../../../features/latest/features/proposals/VK_KHR_shader_float_controls2.html)

**Last Modified Date**

2023-05-16

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_KHR_float_controls2`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_float_controls2.html).

**Contributors**

* 
Graeme Leese, Broadcom

This extension enables use of the more expressive fast floating-point math
flags in the SPV_KHR_float_controls2 extension.
These flags give finer- grained control over which optimizations compilers
may apply, potentially speeding up execution while retaining correct
results.

The extension also adds control over the fast-math modes to the GLSL
extended instruction set, making these operations more consistent with
SPIR-V and allowing their use in situations where floating-point conformance
is important.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderFloatControls2FeaturesKHR](VkPhysicalDeviceShaderFloatControls2Features.html)

* 
`VK_KHR_SHADER_FLOAT_CONTROLS_2_EXTENSION_NAME`

* 
`VK_KHR_SHADER_FLOAT_CONTROLS_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES_KHR](VkStructureType.html)

* 
[FloatControls2](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-FloatControls2)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2023-05-16 (Graeme Leese)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_float_controls2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
