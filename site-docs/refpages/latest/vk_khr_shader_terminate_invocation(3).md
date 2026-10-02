# VK_KHR_shader_terminate_invocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_terminate_invocation.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_terminate_invocation](#VK_KHR_shader_terminate_invocation)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_terminate_invocation - device extension

**Name String**

`VK_KHR_shader_terminate_invocation`

**Extension Type**

Device extension

**Registered Extension Number**

216

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_terminate_invocation](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_terminate_invocation.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_terminate_invocation] @critsec%0A*Here describe the issue or question you have about the VK_KHR_shader_terminate_invocation extension*)

**Last Modified Date**

2020-08-11

**IP Status**

No known IP claims.

**Contributors**

* 
Alan Baker, Google

* 
Jeff Bolz, NVIDIA

* 
Jesse Hall, Google

* 
Ralph Potter, Samsung

* 
Tom Olson, Arm

This extension adds Vulkan support for the
[`SPV_KHR_terminate_invocation`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_terminate_invocation.html)
SPIR-V extension.
That SPIR-V extension provides a new instruction,
`OpTerminateInvocation`, which causes a shader invocation to immediately
terminate and sets the coverage of shaded samples to `0`; only previously
executed instructions will have observable effects.
The `OpTerminateInvocation` instruction, along with the
`OpDemoteToHelperInvocation` instruction from the
`[VK_EXT_shader_demote_to_helper_invocation](VK_EXT_shader_demote_to_helper_invocation.html)` extension, together
replace the `OpKill` instruction, which could behave like either of these
instructions.
`OpTerminateInvocation` provides the behavior required by the GLSL
`discard` statement, and should be used when available by GLSL compilers
and applications that need the GLSL `discard` behavior.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderTerminateInvocationFeaturesKHR](VkPhysicalDeviceShaderTerminateInvocationFeatures.html)

* 
`VK_KHR_SHADER_TERMINATE_INVOCATION_EXTENSION_NAME`

* 
`VK_KHR_SHADER_TERMINATE_INVOCATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES_KHR](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2020-08-11 (Jesse Hall)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_terminate_invocation).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
