# VkGraphicsPipelineShaderGroupsCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGraphicsPipelineShaderGroupsCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGraphicsPipelineShaderGroupsCreateInfoNV - Structure specifying parameters of a newly created multi shader group pipeline

The `VkGraphicsPipelineShaderGroupsCreateInfoNV` structure is defined
as:

// Provided by VK_NV_device_generated_commands
typedef struct VkGraphicsPipelineShaderGroupsCreateInfoNV {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    groupCount;
    const VkGraphicsShaderGroupCreateInfoNV*    pGroups;
    uint32_t                                    pipelineCount;
    const VkPipeline*                           pPipelines;
} VkGraphicsPipelineShaderGroupsCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`groupCount` is the number of elements in the `pGroups` array.

* 
`pGroups` is a pointer to an array of
[VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html) structures specifying which
state of the original [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) each shader
group overrides.

* 
`pipelineCount` is the number of elements in the `pPipelines`
array.

* 
`pPipelines` is a pointer to an array of graphics `VkPipeline`
structures which are referenced within the created pipeline, including
all their shader groups.

When referencing shader groups by index, groups defined in the referenced
pipelines are treated as if they were defined as additional entries in
`pGroups`.
They are appended in the order they appear in the `pPipelines` array and
in the `pGroups` array when those pipelines were defined.

The application **must** maintain the lifetime of all such referenced pipelines
based on the pipelines that make use of them.

Valid Usage

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02879) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02879

`groupCount` **must** be at least `1` and as maximum
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxGraphicsShaderGroupCount`

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02880) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02880

The sum of `groupCount` including those groups added from referenced
`pPipelines` **must** also be as maximum
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxGraphicsShaderGroupCount`

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02881) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02881

The state of the first element of `pGroups` **must** match its
equivalent within the parent’s [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02882) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02882

Each element of `pGroups` **must** in combination with the rest of the
pipeline state yield a valid state configuration

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02884) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02884

All elements of `pGroups` **must** use the same shader stage
combinations
unless any mesh shader stage is used, then either combination of task
and mesh or just mesh shader is valid

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02885) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02885

Mesh and regular primitive shading stages cannot be mixed across
`pGroups`

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-02886) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-02886

Each element of `pPipelines` **must** have been created with identical
state to the pipeline currently created except the state that can be
overridden by [VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-deviceGeneratedCommands-02887) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-deviceGeneratedCommands-02887

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-sType-sType) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_SHADER_GROUPS_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-parameter) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-parameter

 If `groupCount` is not `0`, `pGroups` **must** be a valid pointer to an array of `groupCount` valid [VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html) structures

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-parameter) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-parameter

 If `pipelineCount` is not `0`, `pPipelines` **must** be a valid pointer to an array of `pipelineCount` valid [VkPipeline](VkPipeline.html) handles

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkGraphicsPipelineShaderGroupsCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
