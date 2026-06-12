# vkGetDescriptorSetLayoutSupport(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDescriptorSetLayoutSupport.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDescriptorSetLayoutSupport - Query whether a descriptor set layout can be created

To query information about whether a descriptor set layout **can** be created,
call:

// Provided by VK_VERSION_1_1
void vkGetDescriptorSetLayoutSupport(
    VkDevice                                    device,
    const VkDescriptorSetLayoutCreateInfo*      pCreateInfo,
    VkDescriptorSetLayoutSupport*               pSupport);

// Provided by VK_KHR_maintenance3
// Equivalent to vkGetDescriptorSetLayoutSupport
void vkGetDescriptorSetLayoutSupportKHR(
    VkDevice                                    device,
    const VkDescriptorSetLayoutCreateInfo*      pCreateInfo,
    VkDescriptorSetLayoutSupport*               pSupport);

* 
`device` is the logical device that would create the descriptor set
layout.

* 
`pCreateInfo` is a pointer to a
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) structure specifying the state of
the descriptor set layout object.

* 
`pSupport` is a pointer to a [VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html)
structure, in which information about support for the descriptor set
layout object is returned.

Some implementations have limitations on what fits in a descriptor set which
are not easily expressible in terms of existing limits like
`maxDescriptorSet`*, for example if all descriptor types share a limited
space in memory but each descriptor is a different size or alignment.
This command returns information about whether a descriptor set satisfies
this limit.
If the descriptor set layout satisfies the
[VkPhysicalDeviceMaintenance3Properties](VkPhysicalDeviceMaintenance3Properties.html)::`maxPerSetDescriptors`
limit, this command is guaranteed to return [VK_TRUE](VK_TRUE.html) in
[VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html)::`supported`.
If the descriptor set layout exceeds the
[VkPhysicalDeviceMaintenance3Properties](VkPhysicalDeviceMaintenance3Properties.html)::`maxPerSetDescriptors`
limit, whether the descriptor set layout is supported is
implementation-dependent and **may** depend on whether the descriptor sizes and
alignments cause the layout to exceed an internal limit.

This command does not consider other limits such as
`maxPerStageDescriptor`*, and so a descriptor set layout that is
supported according to this command **must** still satisfy the pipeline layout
limits such as `maxPerStageDescriptor`* in order to be used in a
pipeline layout.

|  | This is a `VkDevice` query rather than `VkPhysicalDevice` because
| --- | --- |
the answer **may** depend on enabled features. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutSupport-device-parameter) VUID-vkGetDescriptorSetLayoutSupport-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSupport-pCreateInfo-parameter) VUID-vkGetDescriptorSetLayoutSupport-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) structure

* 
[](#VUID-vkGetDescriptorSetLayoutSupport-pSupport-parameter) VUID-vkGetDescriptorSetLayoutSupport-pSupport-parameter

 `pSupport` **must** be a valid pointer to a [VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html) structure

[VK_KHR_maintenance3](VK_KHR_maintenance3.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html), [VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkGetDescriptorSetLayoutSupport).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
