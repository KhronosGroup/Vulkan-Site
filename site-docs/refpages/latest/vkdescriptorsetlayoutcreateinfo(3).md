# VkDescriptorSetLayoutCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetLayoutCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetLayoutCreateInfo - Structure specifying parameters of a newly created descriptor set layout

Information about the descriptor set layout is passed in a
`VkDescriptorSetLayoutCreateInfo` structure:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorSetLayoutCreateInfo {
    VkStructureType                        sType;
    const void*                            pNext;
    VkDescriptorSetLayoutCreateFlags       flags;
    uint32_t                               bindingCount;
    const VkDescriptorSetLayoutBinding*    pBindings;
} VkDescriptorSetLayoutCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask
of [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html)
specifying options for descriptor set layout creation.

* 
`bindingCount` is the number of elements in `pBindings`.

* 
`pBindings` is a pointer to an array of
[VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html) structures.

Valid Usage

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-binding-00279) VUID-VkDescriptorSetLayoutCreateInfo-binding-00279

If the [`perStageDescriptorSet`](../../../../spec/latest/chapters/features.html#features-perStageDescriptorSet)
feature is not enabled, or `flags` does not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](VkDescriptorSetLayoutCreateFlagBits.html), then the
[VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html)::`binding` members of the
elements of the `pBindings` array **must** each have different values

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-10354) VUID-VkDescriptorSetLayoutCreateInfo-flags-10354

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html),
and the [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) extension is not enabled,
[`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor) **must** be enabled

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-00280) VUID-VkDescriptorSetLayoutCreateInfo-flags-00280

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html), then all
elements of `pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-02208) VUID-VkDescriptorSetLayoutCreateInfo-flags-02208

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html), then all
elements of `pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-00281) VUID-VkDescriptorSetLayoutCreateInfo-flags-00281

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html), then the
total number of elements of all bindings **must** be less than or equal to
[VkPhysicalDevicePushDescriptorProperties](VkPhysicalDevicePushDescriptorProperties.html)::`maxPushDescriptors`

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04590) VUID-VkDescriptorSetLayoutCreateInfo-flags-04590

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html), `flags`
**must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04591) VUID-VkDescriptorSetLayoutCreateInfo-flags-04591

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html),
`pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-03000) VUID-VkDescriptorSetLayoutCreateInfo-flags-03000

If any binding has the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)
bit set, `flags` **must** include
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-03001) VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-03001

If any binding has the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)
bit set, then all bindings **must** not have `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04592) VUID-VkDescriptorSetLayoutCreateInfo-flags-04592

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html),
`flags` **must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-pBindings-07303) VUID-VkDescriptorSetLayoutCreateInfo-pBindings-07303

If any element `pBindings`[i] has a `descriptorType` of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), then the `pNext` chain **must**
include a [VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html) structure, and
`mutableDescriptorTypeListCount` **must** be greater than i

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-04594) VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-04594

If a binding has a `descriptorType` value of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html), then `pImmutableSamplers`
**must** be `NULL`

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-mutableDescriptorType-04595) VUID-VkDescriptorSetLayoutCreateInfo-mutableDescriptorType-04595

If
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT.html)::`mutableDescriptorType`
is not enabled, `pBindings` **must** not contain a `descriptorType`
of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04596) VUID-VkDescriptorSetLayoutCreateInfo-flags-04596

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html),
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT.html)::`mutableDescriptorType`
**must** be enabled

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08000) VUID-VkDescriptorSetLayoutCreateInfo-flags-08000

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html), then
all elements of `pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08001) VUID-VkDescriptorSetLayoutCreateInfo-flags-08001

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html),
`flags` **must** also contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08002) VUID-VkDescriptorSetLayoutCreateInfo-flags-08002

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html), then
`flags` **must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08003) VUID-VkDescriptorSetLayoutCreateInfo-flags-08003

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html), then
`flags` **must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-09463) VUID-VkDescriptorSetLayoutCreateInfo-flags-09463

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](VkDescriptorSetLayoutCreateFlagBits.html), then
[`perStageDescriptorSet`](../../../../spec/latest/chapters/features.html#features-perStageDescriptorSet) **must** be
enabled

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-09464) VUID-VkDescriptorSetLayoutCreateInfo-flags-09464

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](VkDescriptorSetLayoutCreateFlagBits.html), then there **must**
not be any two elements of the `pBindings` array with the same
[VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html)::`binding` value and their
[VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html)::`stageFlags` containing the same
bit

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-sType-sType) VUID-VkDescriptorSetLayoutCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-pNext-pNext) VUID-VkDescriptorSetLayoutCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDescriptorSetLayoutBindingFlagsCreateInfo](VkDescriptorSetLayoutBindingFlagsCreateInfo.html) or [VkMutableDescriptorTypeCreateInfoEXT](VkMutableDescriptorTypeCreateInfoEXT.html)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-sType-unique) VUID-VkDescriptorSetLayoutCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-parameter) VUID-VkDescriptorSetLayoutCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html) values

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-pBindings-parameter) VUID-VkDescriptorSetLayoutCreateInfo-pBindings-parameter

 If `bindingCount` is not `0`, `pBindings` **must** be a valid pointer to an array of `bindingCount` valid [VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html) structures

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html), [VkDescriptorSetLayoutCreateFlags](VkDescriptorSetLayoutCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateDescriptorSetLayout](vkCreateDescriptorSetLayout.html), [vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html), [vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetLayoutCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
