# VK_KHR_buffer_device_address(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_buffer_device_address.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_buffer_device_address](#VK_KHR_buffer_device_address)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_buffer_device_address - device extension

**Name String**

`VK_KHR_buffer_device_address`

**Extension Type**

Device extension

**Registered Extension Number**

258

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     and

     [VK_KHR_device_group](VK_KHR_device_group.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_physical_storage_buffer](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_physical_storage_buffer.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_buffer_device_address] @jeffbolznv%0A*Here describe the issue or question you have about the VK_KHR_buffer_device_address extension*)

**Last Modified Date**

2019-06-24

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_EXT_buffer_reference`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference.txt)
and
[`GL_EXT_buffer_reference2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference2.txt)
and
[`GL_EXT_buffer_reference_uvec2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference_uvec2.txt)

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

* 
Jan-Harald Fredriksen, Arm

This extension allows the application to query a 64-bit buffer device
address value for a buffer, which can be used to access the buffer memory
via the `PhysicalStorageBuffer` storage class in the
[`GL_EXT_buffer_reference`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference.txt)
GLSL extension and
[`SPV_KHR_physical_storage_buffer`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_physical_storage_buffer.html)
SPIR-V extension.

Another way to describe this extension is that it adds “pointers to buffer
memory in shaders”.
By calling [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html) with a `VkBuffer`, it will
return a `VkDeviceAddress` value which represents the address of the
start of the buffer.

[vkGetBufferOpaqueCaptureAddress](vkGetBufferOpaqueCaptureAddress.html) and
[vkGetDeviceMemoryOpaqueCaptureAddress](vkGetDeviceMemoryOpaqueCaptureAddress.html) allow opaque addresses for
buffers and memory objects to be queried for the current process.
A trace capture and replay tool can then supply these addresses to be used
at replay time to match the addresses used when the trace was captured.
To enable tools to insert these queries, new memory allocation flags must be
specified for memory objects that will be bound to buffers accessed via the
`PhysicalStorageBuffer` storage class.
**Note that this mechanism is intended only to support capture/replay tools,
and is not recommended for use in other applications.**

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the
`bufferDeviceAddress` feature is optional.
The original type, enum, and command names are still available as aliases of
the core functionality.

If Vulkan 1.3 is supported, support for the `bufferDeviceAddress`
capability is required.

* 
[vkGetBufferDeviceAddressKHR](vkGetBufferDeviceAddress.html)

* 
[vkGetBufferOpaqueCaptureAddressKHR](vkGetBufferOpaqueCaptureAddress.html)

* 
[vkGetDeviceMemoryOpaqueCaptureAddressKHR](vkGetDeviceMemoryOpaqueCaptureAddress.html)

* 
[VkBufferDeviceAddressInfoKHR](VkBufferDeviceAddressInfo.html)

* 
[VkDeviceMemoryOpaqueCaptureAddressInfoKHR](VkDeviceMemoryOpaqueCaptureAddressInfo.html)

* 
Extending [VkBufferCreateInfo](VkBufferCreateInfo.html):

[VkBufferOpaqueCaptureAddressCreateInfoKHR](VkBufferOpaqueCaptureAddressCreateInfo.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkMemoryOpaqueCaptureAddressAllocateInfoKHR](VkMemoryOpaqueCaptureAddressAllocateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceBufferDeviceAddressFeaturesKHR](VkPhysicalDeviceBufferDeviceAddressFeatures.html)

* 
`VK_KHR_BUFFER_DEVICE_ADDRESS_EXTENSION_NAME`

* 
`VK_KHR_BUFFER_DEVICE_ADDRESS_SPEC_VERSION`

* 
Extending [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html):

[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkBufferCreateFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT_KHR](VkBufferUsageFlagBits.html)

Extending [VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html):

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT_KHR](VkMemoryAllocateFlagBits.html)

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](VkMemoryAllocateFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_KHR](VkStructureType.html)

* 
[    `PhysicalStorageBufferAddresses`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-PhysicalStorageBufferAddresses)

There are various use cases this extensions is designed for.
It is required for ray tracing, useful for DX12 portability, and it allows
storing buffer addresses in memory (enabling creating more complex data
structures).

This extension can also be used to hardcode a dedicated debug channel into
all shaders without impacting other descriptor limits by querying a buffer
device address at startup and pushing that into shaders as a runtime
constant (e.g. specialization constant).

There are examples of usage in the
[`GL_EXT_buffer_reference`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference.txt)
spec for how to use this in a high-level shading language such as GLSL.
The
[`GL_EXT_buffer_reference2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference2.txt)
and
[`GL_EXT_buffer_reference_uvec2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/ext/GLSL_EXT_buffer_reference_uvec2.txt)
extensions were added to help cover a few edge cases missed by the original
`GL_EXT_buffer_reference`.

* 
Revision 1, 2019-06-24 (Jan-Harald Fredriksen)

Internal revisions based on VK_EXT_buffer_device_address

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_buffer_device_address).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
