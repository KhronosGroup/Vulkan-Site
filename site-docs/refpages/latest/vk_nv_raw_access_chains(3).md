# VK_NV_raw_access_chains(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_raw_access_chains.html

## Table of Contents

- [Name](#_name)
- [VK_NV_raw_access_chains](#VK_NV_raw_access_chains)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_raw_access_chains - device extension

**Name String**

`VK_NV_raw_access_chains`

**Extension Type**

Device extension

**Registered Extension Number**

556

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
[SPV_NV_raw_access_chains](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_raw_access_chains.html)

**Contact**

* 
Rodrigo Locatti [rlocatti](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_raw_access_chains] @rlocatti%0A*Here describe the issue or question you have about the VK_NV_raw_access_chains extension*)

**Last Modified Date**

2023-12-04

**Interactions and External Dependencies**

* 
This extension requires
[`SPV_NV_raw_access_chains`](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_raw_access_chains.html)

**Contributors**

* 
Hans-Kristian Arntzen, Valve

* 
Rodrigo Locatti, NVIDIA

This extension allows the use of the `SPV_NV_raw_access_chains` extension in
SPIR-V shader modules.
This enables SPIR-V producers to efficiently implement interfaces similar to
Direct3D structured buffers and byte address buffers, allowing shaders
compiled from an HLSL source to generate more efficient code.

* 
[RawAccessChainsNV](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RawAccessChainsNV)

* 
Revision 1, 2023-12-04 (Rodrigo Locatti)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_raw_access_chains).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
