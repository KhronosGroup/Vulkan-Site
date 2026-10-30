# VkDispatchIndirectCommand(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDispatchIndirectCommand.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDispatchIndirectCommand - Structure specifying an indirect dispatching command

The `VkDispatchIndirectCommand` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDispatchIndirectCommand {
    uint32_t    x;
    uint32_t    y;
    uint32_t    z;
} VkDispatchIndirectCommand;

* 
`x` is the number of local workgroups to dispatch in the X
dimension.

* 
`y` is the number of local workgroups to dispatch in the Y
dimension.

* 
`z` is the number of local workgroups to dispatch in the Z
dimension.

The members of `VkDispatchIndirectCommand` have the same meaning as the
corresponding parameters of [vkCmdDispatch](vkCmdDispatch.html).

Valid Usage

* 
[](#VUID-VkDispatchIndirectCommand-x-00417) VUID-VkDispatchIndirectCommand-x-00417

`x` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-VkDispatchIndirectCommand-y-00418) VUID-VkDispatchIndirectCommand-y-00418

`y` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-VkDispatchIndirectCommand-z-00419) VUID-VkDispatchIndirectCommand-z-00419

`z` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

[VK_VERSION_1_0](VK_VERSION_1_0.html), [vkCmdDispatchIndirect](vkCmdDispatchIndirect.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#VkDispatchIndirectCommand).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
