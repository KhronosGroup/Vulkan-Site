# VkDispatchGraphCountInfoAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDispatchGraphCountInfoAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDispatchGraphCountInfoAMDX - Structure specifying count parameters for execution graph dispatch

The `VkDispatchGraphCountInfoAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkDispatchGraphCountInfoAMDX {
    uint32_t                          count;
    VkDeviceOrHostAddressConstAMDX    infos;
    uint64_t                          stride;
} VkDispatchGraphCountInfoAMDX;

* 
`count` is the number of dispatches to perform.

* 
`infos` is the device or host address of a flat array of
[VkDispatchGraphInfoAMDX](VkDispatchGraphInfoAMDX.html) structures

* 
`stride` is the byte stride between successive
[VkDispatchGraphInfoAMDX](VkDispatchGraphInfoAMDX.html) structures in `infos`

Whether `infos` is consumed as a device or host pointer is defined by
the command this structure is used in.

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkDeviceOrHostAddressConstAMDX](VkDeviceOrHostAddressConstAMDX.html), [vkCmdDispatchGraphAMDX](vkCmdDispatchGraphAMDX.html), [vkCmdDispatchGraphIndirectAMDX](vkCmdDispatchGraphIndirectAMDX.html), [vkCmdDispatchGraphIndirectCountAMDX](vkCmdDispatchGraphIndirectCountAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#VkDispatchGraphCountInfoAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
