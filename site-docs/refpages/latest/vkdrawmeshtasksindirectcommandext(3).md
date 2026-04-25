# VkDrawMeshTasksIndirectCommandEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawMeshTasksIndirectCommandEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawMeshTasksIndirectCommandEXT - Structure specifying a mesh tasks draw indirect command

The `VkDrawMeshTasksIndirectCommandEXT` structure is defined as:

// Provided by VK_EXT_mesh_shader
typedef struct VkDrawMeshTasksIndirectCommandEXT {
    uint32_t    groupCountX;
    uint32_t    groupCountY;
    uint32_t    groupCountZ;
} VkDrawMeshTasksIndirectCommandEXT;

* 
`groupCountX` is the number of local workgroups to dispatch in the X
dimension.

* 
`groupCountY` is the number of local workgroups to dispatch in the Y
dimension.

* 
`groupCountZ` is the number of local workgroups to dispatch in the Z
dimension.

The members of `VkDrawMeshTasksIndirectCommandEXT` have the same meaning
as the similarly named parameters of [vkCmdDrawMeshTasksEXT](vkCmdDrawMeshTasksEXT.html).

Valid Usage

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07322) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07322

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
contains a shader using the `TaskEXT` `Execution` `Model`,
`groupCountX` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxTaskWorkGroupCount`[0]

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07323) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07323

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
contains a shader using the `TaskEXT` `Execution` `Model`,
`groupCountY` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxTaskWorkGroupCount`[1]

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07324) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07324

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
contains a shader using the `TaskEXT` `Execution` `Model`,
`groupCountZ` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxTaskWorkGroupCount`[2]

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07325) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07325

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
contains a shader using the `TaskEXT` `Execution` `Model`, The product
of `groupCountX`, `groupCountY` and `groupCountZ` **must** be
less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxTaskWorkGroupTotalCount`

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07326) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07326

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
does not contain a shader using the `TaskEXT` `Execution` `Model`,
`groupCountX` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshWorkGroupCount`[0]

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07327) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07327

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
does not contain a shader using the `TaskEXT` `Execution` `Model`,
`groupCountY` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshWorkGroupCount`[1]

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07328) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07328

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
does not contain a shader using the `TaskEXT` `Execution` `Model`,
`groupCountZ` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshWorkGroupCount`[2]

* 
[](#VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07329) VUID-VkDrawMeshTasksIndirectCommandEXT-TaskEXT-07329

If the current pipeline bound to [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
does not contain a shader using the `TaskEXT` `Execution` `Model`, The
product of `groupCountX`, `groupCountY` and `groupCountZ`
**must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshWorkGroupTotalCount`

[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html), [vkCmdDrawMeshTasksIndirectEXT](vkCmdDrawMeshTasksIndirectEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkDrawMeshTasksIndirectCommandEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
