# VK_KHR_workgroup_memory_explicit_layout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_workgroup_memory_explicit_layout.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_workgroup_memory_explicit_layout](#VK_KHR_workgroup_memory_explicit_layout)
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

VK_KHR_workgroup_memory_explicit_layout - device extension

**Name String**

`VK_KHR_workgroup_memory_explicit_layout`

**Extension Type**

Device extension

**Registered Extension Number**

337

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
[SPV_KHR_workgroup_memory_explicit_layout](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_workgroup_memory_explicit_layout.html)

**Contact**

* 
Caio Marcelo de Oliveira Filho [cmarcelo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_workgroup_memory_explicit_layout] @cmarcelo%0A*Here describe the issue or question you have about the VK_KHR_workgroup_memory_explicit_layout extension*)

**Last Modified Date**

2020-06-01

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_shared_memory_block`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GL_EXT_shared_memory_block.txt)

**Contributors**

* 
Caio Marcelo de Oliveira Filho, Intel

* 
Jeff Bolz, NVIDIA

* 
Graeme Leese, Broadcom

* 
Faith Ekstrand, Intel

* 
Daniel Koch, NVIDIA

This extension adds Vulkan support for the
[`SPV_KHR_workgroup_memory_explicit_layout`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_workgroup_memory_explicit_layout.html)
SPIR-V extension, which allows shaders to explicitly define the layout of
`Workgroup` storage class memory and create aliases between variables
from that storage class in a compute shader.

The aliasing feature allows different “views” on the same data, so the
shader can bulk copy data from another storage class using one type (e.g. an
array of large vectors), and then use the data with a more specific type.
It also enables reducing the amount of workgroup memory consumed by allowing
the shader to alias data whose lifetimes do not overlap.

The explicit layout support and some form of aliasing is also required for
layering OpenCL on top of Vulkan.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR](VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR.html)

* 
`VK_KHR_WORKGROUP_MEMORY_EXPLICIT_LAYOUT_EXTENSION_NAME`

* 
`VK_KHR_WORKGROUP_MEMORY_EXPLICIT_LAYOUT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_WORKGROUP_MEMORY_EXPLICIT_LAYOUT_FEATURES_KHR](VkStructureType.html)

* 
[    `WorkgroupMemoryExplicitLayoutKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-WorkgroupMemoryExplicitLayoutKHR)

* 
[    `WorkgroupMemoryExplicitLayout8BitAccessKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-WorkgroupMemoryExplicitLayout8BitAccessKHR)

* 
[    `WorkgroupMemoryExplicitLayout16BitAccessKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-WorkgroupMemoryExplicitLayout16BitAccessKHR)

* 
Revision 1, 2020-06-01 (Caio Marcelo de Oliveira Filho)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_workgroup_memory_explicit_layout).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
