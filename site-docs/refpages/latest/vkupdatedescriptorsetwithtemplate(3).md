# vkUpdateDescriptorSetWithTemplate(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUpdateDescriptorSetWithTemplate.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUpdateDescriptorSetWithTemplate - Update the contents of a descriptor set object using an update template

Once a `VkDescriptorUpdateTemplate` has been created, descriptor sets
**can** be updated by calling:

// Provided by VK_VERSION_1_1
void vkUpdateDescriptorSetWithTemplate(
    VkDevice                                    device,
    VkDescriptorSet                             descriptorSet,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const void*                                 pData);

// Provided by VK_KHR_descriptor_update_template
// Equivalent to vkUpdateDescriptorSetWithTemplate
void vkUpdateDescriptorSetWithTemplateKHR(
    VkDevice                                    device,
    VkDescriptorSet                             descriptorSet,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const void*                                 pData);

* 
`device` is the logical device that updates the descriptor set.

* 
`descriptorSet` is the descriptor set to update

* 
`descriptorUpdateTemplate` is a [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html)
object specifying the update mapping between `pData` and the
descriptor set to update.

* 
`pData` is a pointer to memory containing one or more
    [VkDescriptorImageInfo](VkDescriptorImageInfo.html), [VkDescriptorBufferInfo](VkDescriptorBufferInfo.html), or
    [VkBufferView](VkBufferView.html) structures
or [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html)
or [VkAccelerationStructureNV](VkAccelerationStructureNV.html)
handles
    used to write the descriptors.

Valid Usage

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-pData-01685) VUID-vkUpdateDescriptorSetWithTemplate-pData-01685

    `pData` **must** be a valid pointer to a memory containing one or more
    valid instances of
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handles,
[VkAccelerationStructureNV](VkAccelerationStructureNV.html) handles,
    [VkDescriptorImageInfo](VkDescriptorImageInfo.html), [VkDescriptorBufferInfo](VkDescriptorBufferInfo.html), or
    [VkBufferView](VkBufferView.html) in a layout defined by `descriptorUpdateTemplate`
    when it was created with [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html)

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-06995) VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-06995

Host access to `descriptorSet` **must** be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior)
unless explicitly denoted otherwise for specific flags

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-device-parameter) VUID-vkUpdateDescriptorSetWithTemplate-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parameter) VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parameter

 `descriptorSet` **must** be a valid [VkDescriptorSet](VkDescriptorSet.html) handle

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter) VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter

 `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) handle

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parent) VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parent

 `descriptorSet` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parent) VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parent

 `descriptorUpdateTemplate` **must** have been created, allocated, or retrieved from `device`

API Example

struct AppBufferView {
    VkBufferView bufferView;
    uint32_t     applicationRelatedInformation;
};

struct AppDataStructure
{
    VkDescriptorImageInfo  imageInfo;          // a single image info
    VkDescriptorBufferInfo bufferInfoArray[3]; // 3 buffer infos in an array
    AppBufferView          bufferView[2];      // An application-defined structure containing a bufferView
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
        .stride = 0         // stride not required if descriptorCount is 1
    },

    // binding to an array of buffer descriptors
    {
        .binding = 1,
        .dstArrayElement = 0,
        .descriptorCount = 3,
        .descriptorType = VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
        .offset = offsetof(AppDataStructure, bufferInfoArray),
        .stride = sizeof(VkDescriptorBufferInfo)    // descriptor buffer infos are compact
    },

    // binding to an array of buffer views
    {
        .binding = 2,
        .dstArrayElement = 0,
        .descriptorCount = 2,
        .descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER,
        .offset = offsetof(AppDataStructure, bufferView) +
                  offsetof(AppBufferView, bufferView),
        .stride = sizeof(AppBufferView)             // bufferViews do not have to be compact
    },
};

// create a descriptor update template for descriptor set updates
const VkDescriptorUpdateTemplateCreateInfo createInfo =
{
    .sType = VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .descriptorUpdateEntryCount = 3,
    .pDescriptorUpdateEntries = descriptorUpdateTemplateEntries,
    .templateType = VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET,
    .descriptorSetLayout = myLayout,
    .pipelineBindPoint = 0,     // ignored by given templateType
    .pipelineLayout = 0,        // ignored by given templateType
    .set = 0,                   // ignored by given templateType
};

VkDescriptorUpdateTemplate myDescriptorUpdateTemplate;
myResult = vkCreateDescriptorUpdateTemplate(
    myDevice,
    &createInfo,
    NULL,
    &myDescriptorUpdateTemplate);

AppDataStructure appData;

// fill appData here or cache it in your engine
vkUpdateDescriptorSetWithTemplate(myDevice, myDescriptorSet, myDescriptorUpdateTemplate, &appData);

[VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDescriptorSet](VkDescriptorSet.html), [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkUpdateDescriptorSetWithTemplate).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
