# VkDispatchGraphInfoAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDispatchGraphInfoAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDispatchGraphInfoAMDX - Structure specifying node parameters for execution graph dispatch

The `VkDispatchGraphInfoAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkDispatchGraphInfoAMDX {
    uint32_t                          nodeIndex;
    uint32_t                          payloadCount;
    VkDeviceOrHostAddressConstAMDX    payloads;
    uint64_t                          payloadStride;
} VkDispatchGraphInfoAMDX;

* 
`nodeIndex` is the index of a node in an execution graph to be
dispatched.

* 
`payloadCount` is the number of payloads to dispatch for the
specified node.

* 
`payloads` is a device or host address pointer to a flat array of
payloads with size equal to the product of `payloadCount` and
`payloadStride`

* 
`payloadStride` is the byte stride between successive payloads in
`payloads`

Whether `payloads` is consumed as a device or host pointer is defined by
the command this structure is used in.

Valid Usage

* 
[](#VUID-VkDispatchGraphInfoAMDX-payloadCount-09171) VUID-VkDispatchGraphInfoAMDX-payloadCount-09171

`payloadCount` **must** be no greater than
[    `maxExecutionGraphShaderPayloadCount`](../../../../spec/latest/chapters/limits.html#limits-maxExecutionGraphShaderPayloadCount)

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkDeviceOrHostAddressConstAMDX](VkDeviceOrHostAddressConstAMDX.html), [VkDispatchGraphCountInfoAMDX](VkDispatchGraphCountInfoAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#VkDispatchGraphInfoAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
