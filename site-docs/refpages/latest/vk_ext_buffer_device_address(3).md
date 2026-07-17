# VK_EXT_buffer_device_address(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_buffer_device_address.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_buffer_device_address](#VK_EXT_buffer_device_address)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
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

VK_EXT_buffer_device_address - device extension

**Name String**

`VK_EXT_buffer_device_address`

**Extension Type**

Device extension

**Registered Extension Number**

245

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_EXT_physical_storage_buffer](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_physical_storage_buffer.html)

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)
extension

Which in turn was *promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_buffer_device_address] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_buffer_device_address extension*)

**Last Modified Date**

2019-01-06

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GLSL_EXT_buffer_reference`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference.txt)
and
[`GLSL_EXT_buffer_reference_uvec2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference_uvec2.txt)

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Neil Henning, AMD

* 
Tobias Hector, AMD

* 
Faith Ekstrand, Intel

* 
Baldur Karlsson, Valve

This extension allows the application to query a 64-bit buffer device
address value for a buffer, which can be used to access the buffer memory
via the `PhysicalStorageBufferEXT` storage class in the
[`GL_EXT_buffer_reference`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference.txt)
GLSL extension and
[`SPV_EXT_physical_storage_buffer`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_EXT_physical_storage_buffer.html)
SPIR-V extension.

It also allows buffer device addresses to be provided by a trace replay
tool, so that it matches the address used when the trace was captured.

* 
[vkGetBufferDeviceAddressEXT](vkGetBufferDeviceAddress.html)

* 
[VkBufferDeviceAddressInfoEXT](VkBufferDeviceAddressInfo.html)

* 
Extending [VkBufferCreateInfo](VkBufferCreateInfo.html):

[VkBufferDeviceAddressCreateInfoEXT](VkBufferDeviceAddressCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceBufferAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html)

* 
[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html)

* 
`VK_EXT_BUFFER_DEVICE_ADDRESS_EXTENSION_NAME`

* 
`VK_EXT_BUFFER_DEVICE_ADDRESS_SPEC_VERSION`

* 
Extending [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html):

[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT_EXT](VkBufferUsageFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_INVALID_DEVICE_ADDRESS_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_CREATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_ADDRESS_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_EXT](VkStructureType.html)

* 
[    `PhysicalStorageBufferAddressesEXT`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-PhysicalStorageBufferAddresses)

1) Where is VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_ADDRESS_FEATURES_EXT
and VkPhysicalDeviceBufferAddressFeaturesEXT?

**RESOLVED**: They were renamed as
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_EXT](VkStructureType.html)
and [VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html) accordingly for
consistency.
Even though, the old names can still be found in the generated header files
for compatibility.

* 
Revision 1, 2018-11-01 (Jeff Bolz)

Internal revisions

Revision 2, 2019-01-06 (Jon Leech)

* 
Minor updates to appendix for publication

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_buffer_device_address).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
