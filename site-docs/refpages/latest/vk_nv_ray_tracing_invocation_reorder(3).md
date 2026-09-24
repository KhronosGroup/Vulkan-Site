# VK_NV_ray_tracing_invocation_reorder(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_ray_tracing_invocation_reorder.html

## Table of Contents

- [Name](#_name)
- [VK_NV_ray_tracing_invocation_reorder](#VK_NV_ray_tracing_invocation_reorder)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [HLSL Mapping](#_hlsl_mapping)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_ray_tracing_invocation_reorder - device extension

**Name String**

`VK_NV_ray_tracing_invocation_reorder`

**Extension Type**

Device extension

**Registered Extension Number**

491

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

**SPIR-V Dependencies**

* 
[SPV_NV_shader_invocation_reorder](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_invocation_reorder.html)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_ray_tracing_invocation_reorder](VK_EXT_ray_tracing_invocation_reorder.html)
extension

**Contact**

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_ray_tracing_invocation_reorder] @ewerness-nv%0A*Here describe the issue or question you have about the VK_NV_ray_tracing_invocation_reorder extension*)

**Last Modified Date**

2022-11-02

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_NV_shader_invocation_reorder`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/nv/GLSL_NV_shader_invocation_reorder.txt)

**Contributors**

* 
Eric Werness, NVIDIA

* 
Ashwin Lele, NVIDIA

The ray tracing pipeline API provides some ability to reorder for locality,
but it is useful to have more control over how the reordering happens and
what information is included in the reordering.
The shader API provides a hit object to contain result information from the
hit which can be used as part of the explicit sorting plus options that
contain an integer for hint bits to use to add more locality.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV](VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV](VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV.html)

* 
[VkRayTracingInvocationReorderModeNV](VkRayTracingInvocationReorderModeEXT.html)

* 
`VK_NV_RAY_TRACING_INVOCATION_REORDER_EXTENSION_NAME`

* 
`VK_NV_RAY_TRACING_INVOCATION_REORDER_SPEC_VERSION`

* 
Extending [VkRayTracingInvocationReorderModeEXT](VkRayTracingInvocationReorderModeEXT.html):

[VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_NV](VkRayTracingInvocationReorderModeEXT.html)

* 
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_NV](VkRayTracingInvocationReorderModeEXT.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_NV](VkStructureType.html)

HLSL does not provide this functionality natively yet.

However, it is possible to use this functionality via
[SPIR-V
Intrinsics](https://github.com/microsoft/DirectXShaderCompiler/wiki/GL_EXT_spirv_intrinsics-for-SPIR-V-code-gen).

The codes for shader invocation reorder are obtained from
[this
page](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_shader_invocation_reorder.html):

#define ShaderInvocationReorderNV 5383
#define HitObjectAttributeNV 5385

#define OpHitObjectRecordHitMotionNV 5249
#define OpHitObjectRecordHitWithIndexMotionNV 5250
#define OpHitObjectRecordMissMotionNV 5251
#define OpHitObjectGetWorldToObjectNV 5252
#define OpHitObjectGetObjectToWorldNV 5253
#define OpHitObjectGetObjectRayDirectionNV 5254
#define OpHitObjectGetObjectRayOriginNV 5255
#define OpHitObjectTraceRayMotionNV 5256
#define OpHitObjectGetShaderRecordBufferHandleNV 5257
#define OpHitObjectGetShaderBindingTableRecordIndexNV 5258
#define OpHitObjectRecordEmptyNV 5259
#define OpHitObjectTraceRayNV 5260
#define OpHitObjectRecordHitNV 5261
#define OpHitObjectRecordHitWithIndexNV 5262
#define OpHitObjectRecordMissNV 5263
#define OpHitObjectExecuteShaderNV 5264
#define OpHitObjectGetCurrentTimeNV 5265
#define OpHitObjectGetAttributesNV 5266
#define OpHitObjectGetHitKindNV 5267
#define OpHitObjectGetPrimitiveIndexNV 5268
#define OpHitObjectGetGeometryIndexNV 5269
#define OpHitObjectGetInstanceIdNV 5270
#define OpHitObjectGetInstanceCustomIndexNV 5271
#define OpHitObjectGetWorldRayDirectionNV 5272
#define OpHitObjectGetWorldRayOriginNV 5273
#define OpHitObjectGetRayTMaxNV 5274
#define OpHitObjectGetRayTMinNV 5275
#define OpHitObjectIsEmptyNV 5276
#define OpHitObjectIsHitNV 5277
#define OpHitObjectIsMissNV 5278
#define OpReorderThreadWithHitObjectNV 5279
#define OpReorderThreadWithHintNV 5280
#define OpTypeHitObjectNV 5281

The capability and extension need to be added:

[[vk::ext_capability(ShaderInvocationReorderNV)]]
[[vk::ext_extension("SPV_NV_shader_invocation_reorder")]]

The creation of the `HitObject` type can be done like this:

[[vk::ext_type_def(HitObjectAttributeNV, OpTypeHitObjectNV)]]
void createHitObjectNV();
#define HitObjectNV vk::ext_type

The payload:

* 
must be global

* 
needs the `RayPayloadKHR` attribute as an extra storage class

struct [raypayload] HitPayload
{
  float hitT : write(closesthit, miss) : read(caller);
  int instanceIndex : write(closesthit) : read(caller);
  float3 pos : write(closesthit) : read(caller);
  float3 nrm : write(closesthit) : read(caller);
};

#define RayPayloadKHR 5338
[[vk::ext_storage_class(RayPayloadKHR)]] static HitPayload payload;

Here is the declaration of a few invocation reordering functions:

[[vk::ext_instruction(OpHitObjectRecordEmptyNV)]]
void hitObjectRecordEmptyNV([[vk::ext_reference]] HitObjectNV hitObject);

[[vk::ext_instruction(OpHitObjectTraceRayNV)]]
void hitObjectTraceRayNV(
    [[vk::ext_reference]] HitObjectNV hitObject,
    RaytracingAccelerationStructure as,
    uint RayFlags,
    uint CullMask,
    uint SBTOffset,
    uint SBTStride,
    uint MissIndex,
    float3 RayOrigin,
    float RayTmin,
    float3 RayDirection,
    float RayTMax,
    [[vk::ext_reference]] [[vk::ext_storage_class(RayPayloadKHR)]] HitPayload payload
  );

[[vk::ext_instruction(OpReorderThreadWithHintNV)]]
void reorderThreadWithHintNV(int Hint, int Bits);

[[vk::ext_instruction(OpReorderThreadWithHitObjectNV)]]
void reorderThreadWithHitObjectNV([[vk::ext_reference]] HitObjectNV hitObject);

[[vk::ext_instruction(OpHitObjectExecuteShaderNV)]]
void hitObjectExecuteShaderNV([[vk::ext_reference]] HitObjectNV hitObject, [[vk::ext_reference]] [[vk::ext_storage_class(RayPayloadKHR)]] HitPayload payload);

[[vk::ext_instruction(OpHitObjectIsHitNV)]]
bool hitObjectIsHitNV([[vk::ext_reference]] HitObjectNV hitObject);

Using the function in the code, can be done like this

  if (USE_SER == 1)
  {
    createHitObjectNV();
    HitObjectNV hObj; //  hitObjectNV hObj;
    hitObjectRecordEmptyNV(hObj); //Initialize to an empty hit object
    hitObjectTraceRayNV(hObj, topLevelAS, rayFlags, 0xFF, 0, 0, 0, r.Origin, 0.0, r.Direction, INFINITE, payload);
    reorderThreadWithHitObjectNV(hObj);
    hitObjectExecuteShaderNV(hObj, payload);
  }

Note:

* 
createHitObjectNV() needs to be call at least once.
This can be also done in the main entry of the shader.

* 
Function with a payload parameter, needs to have the payload struct
defined before.
There are no templated declaration of the function.

* 
Revision 1, 2020-09-12 (Eric Werness, Ashwin Lele)

Initial external release

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_ray_tracing_invocation_reorder).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
