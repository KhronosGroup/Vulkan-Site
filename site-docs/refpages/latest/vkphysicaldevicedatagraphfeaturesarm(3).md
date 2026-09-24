# VkPhysicalDeviceDataGraphFeaturesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDataGraphFeaturesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDataGraphFeaturesARM - Structure describing features to control data graph pipelines

The `VkPhysicalDeviceDataGraphFeaturesARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceDataGraphFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dataGraph;
    VkBool32           dataGraphUpdateAfterBind;
    VkBool32           dataGraphSpecializationConstants;
    VkBool32           dataGraphDescriptorBuffer;
    VkBool32           dataGraphShaderModule;
} VkPhysicalDeviceDataGraphFeaturesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `dataGraph` specifies whether data graph
pipelines **can** be used.

* 
 `dataGraphUpdateAfterBind`
specifies whether data graph pipelines **can** be created with a
[VkPipelineLayout](VkPipelineLayout.html) that uses one or more [VkDescriptorSetLayout](VkDescriptorSetLayout.html)
objects created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`dataGraphSpecializationConstants` specifies whether data graph
pipelines **can** be created from shader modules that use specialization
constants.

* 
 `dataGraphDescriptorBuffer`
specifies whether data graph pipelines **can** use descriptor buffers.

* 
 `dataGraphShaderModule` specifies
whether data graph pipelines **can** be created from a shader module.

If the `VkPhysicalDeviceDataGraphFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDataGraphFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDataGraphFeaturesARM-sType-sType) VUID-VkPhysicalDeviceDataGraphFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_FEATURES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDataGraphFeaturesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
