# VkDeviceOrHostAddressConstAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceOrHostAddressConstAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceOrHostAddressConstAMDX - Union specifying a const device or host address

The `VkDeviceOrHostAddressConstAMDX` union is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef union VkDeviceOrHostAddressConstAMDX {
    VkDeviceAddress    deviceAddress;
    const void*        hostAddress;
} VkDeviceOrHostAddressConstAMDX;

* 
`deviceAddress` is a buffer device address as returned by the
[vkGetBufferDeviceAddressKHR](vkGetBufferDeviceAddress.html) command.

* 
`hostAddress` is a const host memory address.

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), `VkDeviceAddress`, [VkDispatchGraphCountInfoAMDX](VkDispatchGraphCountInfoAMDX.html), [VkDispatchGraphInfoAMDX](VkDispatchGraphInfoAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#VkDeviceOrHostAddressConstAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
