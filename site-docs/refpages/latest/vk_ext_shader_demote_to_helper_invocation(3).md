# VK_EXT_shader_demote_to_helper_invocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_shader_demote_to_helper_invocation.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_shader_demote_to_helper_invocation](#VK_EXT_shader_demote_to_helper_invocation)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capability](#_new_spir_v_capability)
- [New_SPIR-V_Capability](#_new_spir_v_capability)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_shader_demote_to_helper_invocation - device extension

**Name String**

`VK_EXT_shader_demote_to_helper_invocation`

**Extension Type**

Device extension

**Registered Extension Number**

277

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
[SPV_EXT_demote_to_helper_invocation](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_demote_to_helper_invocation.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_shader_demote_to_helper_invocation] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_shader_demote_to_helper_invocation extension*)

**Last Modified Date**

2019-06-01

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_demote_to_helper_invocation`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_demote_to_helper_invocation.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds Vulkan support for the
[`SPV_EXT_demote_to_helper_invocation`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_demote_to_helper_invocation.html)
SPIR-V extension.
That SPIR-V extension provides a new instruction
`OpDemoteToHelperInvocationEXT` allowing shaders to “demote” a fragment
shader invocation to behave like a helper invocation for its duration.
The demoted invocation will have no further side effects and will not output
to the framebuffer, but remains active and can participate in computing
derivatives and in [group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations).
This is a better match for the “discard” instruction in HLSL.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderDemoteToHelperInvocationFeaturesEXT](VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures.html)

* 
`VK_EXT_SHADER_DEMOTE_TO_HELPER_INVOCATION_EXTENSION_NAME`

* 
`VK_EXT_SHADER_DEMOTE_TO_HELPER_INVOCATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES_EXT](VkStructureType.html)

* 
[    `DemoteToHelperInvocationEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DemoteToHelperInvocation)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2019-06-01 (Jeff Bolz)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_shader_demote_to_helper_invocation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
