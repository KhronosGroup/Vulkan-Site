# VK_KHR_shader_float_controls(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_float_controls.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_float_controls](#VK_KHR_shader_float_controls)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version 4 API Incompatibility](#VK_KHR_shader_controls_v4_incompatibility)
- [Version_4_API_Incompatibility](#VK_KHR_shader_controls_v4_incompatibility)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_float_controls - device extension

**Name String**

`VK_KHR_shader_float_controls`

**Extension Type**

Device extension

**Registered Extension Number**

198

**Revision**

4

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_float_controls](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_float_controls.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Alexander Galazin [alegal-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_float_controls] @alegal-arm%0A*Here describe the issue or question you have about the VK_KHR_shader_float_controls extension*)

**Last Modified Date**

2018-09-11

**IP Status**

No known IP claims.

**Contributors**

* 
Alexander Galazin, Arm

* 
Jan-Harald Fredriksen, Arm

* 
Jeff Bolz, NVIDIA

* 
Graeme Leese, Broadcom

* 
Daniel Rakos, AMD

The `VK_KHR_shader_float_controls` extension enables efficient use of
floating-point computations through the ability to query and override the
implementation’s default behavior for rounding modes, denormals, signed
zero, and infinity.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceFloatControlsPropertiesKHR](VkPhysicalDeviceFloatControlsProperties.html)

* 
[VkShaderFloatControlsIndependenceKHR](VkShaderFloatControlsIndependence.html)

* 
`VK_KHR_SHADER_FLOAT_CONTROLS_EXTENSION_NAME`

* 
`VK_KHR_SHADER_FLOAT_CONTROLS_SPEC_VERSION`

* 
Extending [VkShaderFloatControlsIndependence](VkShaderFloatControlsIndependence.html):

[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY_KHR](VkShaderFloatControlsIndependence.html)

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL_KHR](VkShaderFloatControlsIndependence.html)

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE_KHR](VkShaderFloatControlsIndependence.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES_KHR](VkStructureType.html)

* 
[`DenormPreserve`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DenormPreserve)

* 
[    `DenormFlushToZero`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DenormFlushToZero)

* 
[    `SignedZeroInfNanPreserve`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-SignedZeroInfNanPreserve)

* 
[`RoundingModeRTE`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RoundingModeRTE)

* 
[`RoundingModeRTZ`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RoundingModeRTZ)

1) Which instructions must flush denorms?

**RESOLVED**: Only floating-point conversion, floating-point arithmetic,
floating-point relational (except `OpIsNaN`, `OpIsInf`), and
floating-point GLSL.std.450 extended instructions must flush denormals.

2) What is the denorm behavior for intermediate results?

**RESOLVED**: When a SPIR-V instruction is implemented as a sequence of other
instructions:

* 
in the `DenormFlushToZero` execution mode, the intermediate
instructions may flush denormals, the final result of the sequence **must**
not be denormal.

* 
in the `DenormPreserve` execution mode, denormals must be preserved
throughout the whole sequence.

3) Do denorm and rounding mode controls apply to `OpSpecConstantOp`?

**RESOLVED**: Yes, except when the opcode is `OpQuantizeToF16`.

4) The SPIR-V specification says that `OpConvertFToU` and
`OpConvertFToS` unconditionally round towards zero.
Do the rounding mode controls specified through the execution modes apply to
them?

**RESOLVED**: No, these instructions unconditionally round towards zero.

5) Do any of the “Pack” GLSL.std.450 instructions count as conversion
instructions and have the rounding mode applied?

**RESOLVED**: No, only instructions listed in “section 3.32.11.
Conversion Instructions” of the SPIR-V specification count as conversion
instructions.

6) When using inf/nan-ignore mode, what is expected of `OpIsNan` and
`OpIsInf`?

**RESOLVED**: These instructions must always accurately detect inf/nan if it
is passed to them.

The original versions of `VK_KHR_shader_float_controls` shipped with
booleans named “separateDenormSettings” and
“separateRoundingModeSettings”, which at first glance could have indicated
“they can all be set independently, or not”.
However the spec language as written indicated that the 32-bit value could
always be set independently, and only the 16- and 64-bit controls needed to
be the same if these values were [VK_FALSE](VK_FALSE.html).

As a result of this slight disparity, and lack of test coverage for this
facet of the extension, we ended up with two different behaviors in the
wild, where some implementations worked as written, and others worked based
on the naming.
As these are hard limits in hardware with reasons for exposure as written,
it was not possible to standardize on a single way to make this work within
the existing API.

No known users of this part of the extension exist in the wild, and as such
the Vulkan WG took the unusual step of retroactively changing the once
boolean value into a tri-state enum, breaking source compatibility.
This was however done in such a way as to retain ABI compatibility, in case
any code using this did exist; with the numerical values 0 and 1 retaining
their original specified meaning, and a new value signifying the additional
“all need to be set together” state.
If any applications exist today, compiled binaries will continue to work as
written in most cases, but will need changes before the code can be
recompiled.

* 
Revision 4, 2019-06-18 (Tobias Hector)

Modified settings restrictions, see
[Version 4 API     incompatibility](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_controls_v4_incompatibility)

Revision 3, 2018-09-11 (Alexander Galazin)

* 
Minor restructuring

Revision 2, 2018-04-17 (Alexander Galazin)

* 
Added issues and resolutions

Revision 1, 2018-04-11 (Alexander Galazin)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_float_controls).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
