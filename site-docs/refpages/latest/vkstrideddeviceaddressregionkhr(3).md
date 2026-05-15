# VkStridedDeviceAddressRegionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStridedDeviceAddressRegionKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStridedDeviceAddressRegionKHR - Structure specifying a region of device addresses with a stride

The `VkStridedDeviceAddressRegionKHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkStridedDeviceAddressRegionKHR {
    VkDeviceAddress    deviceAddress;
    VkDeviceSize       stride;
    VkDeviceSize       size;
} VkStridedDeviceAddressRegionKHR;

* 
`deviceAddress` is the device address (as returned by the
[vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html) command) at which the region starts, or
zero if the region is unused.

* 
`stride` is the byte stride between consecutive elements.

* 
`size` is the size in bytes of the region starting at
`deviceAddress`.

Valid Usage

* 
[](#VUID-VkStridedDeviceAddressRegionKHR-size-04631) VUID-VkStridedDeviceAddressRegionKHR-size-04631

If `size` is not zero, all addresses between `deviceAddress` and
`deviceAddress` +  `size` - 1 **must** be in the buffer
device address range of the same buffer

* 
[](#VUID-VkStridedDeviceAddressRegionKHR-size-04632) VUID-VkStridedDeviceAddressRegionKHR-size-04632

If `size` is not zero, `stride` **must** be less than or equal to
the size of the buffer from which `deviceAddress` was queried

Valid Usage (Implicit)

* 
[](#VUID-VkStridedDeviceAddressRegionKHR-deviceAddress-parameter) VUID-VkStridedDeviceAddressRegionKHR-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html), `VkDeviceAddress`, `VkDeviceSize`, [vkCmdTraceRaysIndirectKHR](vkCmdTraceRaysIndirectKHR.html), [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkStridedDeviceAddressRegionKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
