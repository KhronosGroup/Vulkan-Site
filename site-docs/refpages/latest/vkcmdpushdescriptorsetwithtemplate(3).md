# vkCmdPushDescriptorSetWithTemplate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPushDescriptorSetWithTemplate.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPushDescriptorSetWithTemplate - Pushes descriptor updates into a command buffer using a descriptor update template

To use a descriptor update template to specify the push descriptors to
update in a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSetWithTemplate(
    VkCommandBuffer                             commandBuffer,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    const void*                                 pData);

// Provided by VK_KHR_descriptor_update_template with VK_KHR_push_descriptor, VK_KHR_push_descriptor with VK_VERSION_1_1 or VK_KHR_descriptor_update_template
// Equivalent to vkCmdPushDescriptorSetWithTemplate
void vkCmdPushDescriptorSetWithTemplateKHR(
    VkCommandBuffer                             commandBuffer,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    const void*                                 pData);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`descriptorUpdateTemplate` is a descriptor update template defining
how to interpret the descriptor information in `pData`.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.
It **must** be compatible with the layout used to create the
`descriptorUpdateTemplate` handle.

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.
This **must** be the same number used to create the
`descriptorUpdateTemplate` handle.

* 
`pData` is a pointer to memory containing descriptors for the
templated update.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11295) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11296) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-00366) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-00366

The `pipelineBindPoint` specified during the creation of the
descriptor update template **must** be supported by the
`commandBuffer`’s parent `VkCommandPool`’s queue family

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-pData-01686) VUID-vkCmdPushDescriptorSetWithTemplate-pData-01686

`pData` **must** be a valid pointer to a memory containing one or more
valid instances of [VkDescriptorImageInfo](VkDescriptorImageInfo.html),
[VkDescriptorBufferInfo](VkDescriptorBufferInfo.html), or [VkBufferView](VkBufferView.html) in a layout defined
by `descriptorUpdateTemplate` when it was created with
[vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-layout-07993) VUID-vkCmdPushDescriptorSetWithTemplate-layout-07993

`layout` **must** be compatible with the layout used to create
`descriptorUpdateTemplate`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-07994) VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-07994

`descriptorUpdateTemplate` **must** have been created with a
`templateType` of
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-07995) VUID-vkCmdPushDescriptorSetWithTemplate-set-07995

`set` **must** be the same value used to create
`descriptorUpdateTemplate`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-07304) VUID-vkCmdPushDescriptorSetWithTemplate-set-07304

`set` **must** be less than
[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-11854) VUID-vkCmdPushDescriptorSetWithTemplate-set-11854

`set` **must** reference a valid [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle in
`layout`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-07305) VUID-vkCmdPushDescriptorSetWithTemplate-set-07305

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-None-10358) VUID-vkCmdPushDescriptorSetWithTemplate-None-10358

If the [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) extension is not enabled,
[`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-parameter) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter) VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter

 `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-layout-parameter) VUID-vkCmdPushDescriptorSetWithTemplate-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-recording) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-videocoding) VUID-vkCmdPushDescriptorSetWithTemplate-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commonparent) VUID-vkCmdPushDescriptorSetWithTemplate-commonparent

 Each of `commandBuffer`, `descriptorUpdateTemplate`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushDescriptorSetWithTemplate is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

API Example

struct AppDataStructure
{
    VkDescriptorImageInfo  imageInfo;          // a single image info
    // ... some more application-related data
};

const VkDescriptorUpdateTemplateEntry descriptorUpdateTemplateEntries[] =
{
    // binding to a single image descriptor
    {
        .binding = 0,
        .dstArrayElement = 0,
        .descriptorCount = 1,
        .descriptorType = VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER,
        .offset = offsetof(AppDataStructure, imageInfo),
        .stride = 0     // not required if descriptorCount is 1
    }
};

// create a descriptor update template for push descriptor set updates
const VkDescriptorUpdateTemplateCreateInfo createInfo =
{
    .sType = VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .descriptorUpdateEntryCount = 1,
    .pDescriptorUpdateEntries = descriptorUpdateTemplateEntries,
    .templateType = VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS,
    .descriptorSetLayout = 0,   // ignored by given templateType
    .pipelineBindPoint = VK_PIPELINE_BIND_POINT_GRAPHICS,
    .pipelineLayout = myPipelineLayout,
    .set = 0,
};

VkDescriptorUpdateTemplate myDescriptorUpdateTemplate;
myResult = vkCreateDescriptorUpdateTemplate(
    myDevice,
    &createInfo,
    NULL,
    &myDescriptorUpdateTemplate);

AppDataStructure appData;
// fill appData here or cache it in your engine
vkCmdPushDescriptorSetWithTemplate(myCmdBuffer, myDescriptorUpdateTemplate, myPipelineLayout, 0,&appData);

[VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html), [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html), [VkPipelineLayout](VkPipelineLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdPushDescriptorSetWithTemplate).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
