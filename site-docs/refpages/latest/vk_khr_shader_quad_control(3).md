# VK_KHR_shader_quad_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_quad_control.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_quad_control](#VK_KHR_shader_quad_control)
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

VK_KHR_shader_quad_control - device extension

**Name String**

`VK_KHR_shader_quad_control`

**Extension Type**

Device extension

**Registered Extension Number**

236

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

         and

         [VK_KHR_vulkan_memory_model](VK_KHR_vulkan_memory_model.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

and

[VK_KHR_shader_maximal_reconvergence](VK_KHR_shader_maximal_reconvergence.html)

**SPIR-V Dependencies**

* 
[SPV_KHR_quad_control](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_quad_control.html)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_quad_control] @tobski%0A*Here describe the issue or question you have about the VK_KHR_shader_quad_control extension*)

**Extension Proposal**

[VK_KHR_shader_quad_control](../../../../features/latest/features/proposals/VK_KHR_shader_quad_control.html)

**Last Modified Date**

2023-11-01

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Bill Licea-Kane, Qualcomm

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, Arm

* 
Nicolai Hähnle, AMD

* 
Jeff Bolz, NVidia

* 
Alan Baker, Google

* 
Hans-Kristian Arntzen, Valve

This extension adds new quad any/all operations, requires that derivatives
are well-defined in quad-uniform control flow, and adds the ability to
require helper invocations participate in group operations.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderQuadControlFeaturesKHR](VkPhysicalDeviceShaderQuadControlFeaturesKHR.html)

* 
`VK_KHR_SHADER_QUAD_CONTROL_EXTENSION_NAME`

* 
`VK_KHR_SHADER_QUAD_CONTROL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_QUAD_CONTROL_FEATURES_KHR](VkStructureType.html)

* 
[QuadControlKHR](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-QuadControlKHR)

* 
Revision 1, 2023-11-01 (Tobias Hector)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_quad_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
