# VK_VALVE_shader_mixed_float_dot_product(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VALVE_shader_mixed_float_dot_product.html

## Table of Contents

- [Name](#_name)
- [VK_VALVE_shader_mixed_float_dot_product](#VK_VALVE_shader_mixed_float_dot_product)
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

VK_VALVE_shader_mixed_float_dot_product - device extension

**Name String**

`VK_VALVE_shader_mixed_float_dot_product`

**Extension Type**

Device extension

**Registered Extension Number**

674

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

     [VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**SPIR-V Dependencies**

* 
[SPV_VALVE_mixed_float_dot_product](https://github.khronos.org/SPIRV-Registry/extensions/VALVE/SPV_VALVE_mixed_float_dot_product.html)

**Contact**

* 
Georg Lehmann [DadSchoorse](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_shader_mixed_float_dot_product] @DadSchoorse%0A*Here describe the issue or question you have about the VK_VALVE_shader_mixed_float_dot_product extension*)

**Last Modified Date**

2026-02-04

**IP Status**

No known IP claims.

**Contributors**

* 
Georg Lehmann, Valve

* 
Mike Blumenkrantz, Valve

This extension enables support for mixed precision dot product accumulate
operations in shaders as defined in `SPV_VALVE_mixed_float_dot_product`.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE](VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE.html)

* 
`VK_VALVE_SHADER_MIXED_FLOAT_DOT_PRODUCT_EXTENSION_NAME`

* 
`VK_VALVE_SHADER_MIXED_FLOAT_DOT_PRODUCT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MIXED_FLOAT_DOT_PRODUCT_FEATURES_VALVE](VkStructureType.html)

* 
[DotProductFloat16AccFloat32VALVE](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductFloat16AccFloat32VALVE)

* 
[DotProductFloat16AccFloat16VALVE](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductFloat16AccFloat16VALVE)

* 
[DotProductBFloat16AccVALVE](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductBFloat16AccVALVE)

* 
[DotProductFloat8AccFloat32VALVE](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductFloat8AccFloat32VALVE)

* 
Revision 1, 2026-02-04 (Georg Lehmann)

Initial specification

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_VALVE_shader_mixed_float_dot_product).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
