# VK_EXT_ray_tracing_invocation_reorder

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_ray_tracing_invocation_reorder.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Invocation reorder in shaders more generally and use ray query](#_invocation_reorder_in_shaders_more_generally_and_use_ray_query)
- [2.1._Invocation_reorder_in_shaders_more_generally_and_use_ray_query](#_invocation_reorder_in_shaders_more_generally_and_use_ray_query)
- [2.2. Invocation reorder in ray generation shader](#_invocation_reorder_in_ray_generation_shader)
- [2.2._Invocation_reorder_in_ray_generation_shader](#_invocation_reorder_in_ray_generation_shader)
- [2.3. Hit object construction](#_hit_object_construction)
- [2.3._Hit_object_construction](#_hit_object_construction)
- [3. Proposal](#_proposal)
- [3.1. Properties](#_properties)
- [3.2. Reorder, trace, and execute mix](#_reorder_trace_and_execute_mix)
- [3.2._Reorder,_trace,_and_execute_mix](#_reorder_trace_and_execute_mix)
- [3.3. Update SBT parameters on hit object](#_update_sbt_parameters_on_hit_object)
- [3.3._Update_SBT_parameters_on_hit_object](#_update_sbt_parameters_on_hit_object)
- [3.4. HLSL Mapping](#_hlsl_mapping)
- [3.4._HLSL_Mapping](#_hlsl_mapping)
- [4. Examples](#_examples)
- [5. Issues](#_issues)
- [6. Further Functionality](#_further_functionality)
- [6._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Invocation reorder in shaders more generally and use ray query](#_invocation_reorder_in_shaders_more_generally_and_use_ray_query)
[2.2. Invocation reorder in ray generation shader](#_invocation_reorder_in_ray_generation_shader)
[2.3. Hit object construction](#_hit_object_construction)

[3. Proposal](#_proposal)

[3.1. Properties](#_properties)
[3.2. Reorder, trace, and execute mix](#_reorder_trace_and_execute_mix)
[3.3. Update SBT parameters on hit object](#_update_sbt_parameters_on_hit_object)
[3.4. HLSL Mapping](#_hlsl_mapping)

[4. Examples](#_examples)
[5. Issues](#_issues)
[6. Further Functionality](#_further_functionality)

VK_EXT_ray_tracing_invocation_reorder introduces functionality to explicitly reorder in ray generation shaders for better performance on some implementations as well as a new object to manage hits.

The ray tracing pipeline API provides some ability to reorder for locality, but it is useful to have more control over how the reordering
happens and what information is included in the reordering. The shader API provides a hit object to contain result information from the hit
which can be used as part of the explicit sorting plus options that contain an integer for hint bits to use to add more locality.

Graphics invocations are often handled in groupings determined by the arrangement of graphics primitives they belong to, which may make reordering challenging.

Compute shaders have a more exposed layout and shared memory, which would require changes to the programming model to do reordering there.

Thus, these shader types are not ideal for reordering.

Ray generation shaders were designed from inception to allow for invocation reordering, making them a natural fit. Additionally, many of the target use cases
are ray workloads.

Current NV extension has these functions to create hit objects (ignoring motion for now)

void hitObjectRecordEmptyNV(hitObjectNV hitObject)

void hitObjectTraceRayNV(hitObjectNV hitobject,
           accelerationStructureEXT topLevel,
           uint rayFlags,
           uint cullMask,
           uint sbtRecordOffset,
           uint sbtRecordStride,
           uint missIndex,
           vec3 origin,
           float Tmin,
           vec3 direction,
           float Tmax,
           int payload);

void hitObjectRecordHitNV(hitObjectNV hitobject,
            accelerationStructureEXT topLevel,
            int instanceid,
            int primitiveid,
            int geometryindex,
            uint hitKind,
            uint sbtRecordOffset,
            uint sbtRecordStride,
            vec3 origin,
            float Tmin,
            vec3 direction,
            float Tmax,
            int attributeLocation)

void hitObjectRecordHitWithIndexNV(hitObjectNV hitobject,
            accelerationStructureEXT topLevel,
            int instanceid,
            int primitiveid,
            int geometryindex,
            uint hitKind,
            uint sbtRecordIndex,
            vec3 origin,
            float Tmin,
            vec3 direction,
            float Tmax,
            int attributeLocation)

void hitObjectRecordMissNV(hitObjectNV hitObject,
           uint sbtRecordIndex,
           vec3 origin,
           float Tmin,
           vec3 direction,
           float TMax)

Replacing the hit creation functions with ray query functions as discussed, plus simplifying the hit variants gives:

void hitObjectRecordEmptyEXT(hitObjectEXT hitObject)

void hitObjectTraceRayEXT(hitObjectEXT hitobject,
           accelerationStructureEXT topLevel,
           uint rayFlags,
           uint cullMask,
           uint sbtRecordOffset,
           uint sbtRecordStride,
           uint missIndex,
           vec3 origin,
           float Tmin,
           vec3 direction,
           float Tmax,
           int payload);

void hitObjectRecordFromQueryEXT(hitObjectEXT hitobject,
            rayQuery rayQuery,
            uint sbtRecordIndex,
            int attributeLocation)

void hitObjectRecordMissEXT(hitObjectEXT hitObject,
           uint sbtRecordIndex,
           vec3 origin,
           float Tmin,
           vec3 direction,
           float TMax)

VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT has a field rayTracingInvocationReorderReorderingHint
which indicates if the implementation may reorder at the reorder calls or if it will not.

The use case for having the extension exposed without exposing reordering is that an application may
find hit objects to be a useful abstraction even without reordering, for example to separate tracing
from execution of dependent shaders for more debug visibility.

The current NV extension has these functions that reorder based on a specified mix of hit object state and hint bits:

void reorderThreadNV(uint hint, uint bits);
void reorderThreadNV(hitObjectNV hitObject)
void reorderThreadNV(hitObjectNV hitObject, uint hint, uint bits)

Plus this function which executes but is defined to not reorder:

void hitObjectExecuteShaderNV(hitObjectNV hitObject,

int payload)

The proposal is to allow reorder on trace and execute calls as well plus add an optional fused form:

void reorderThreadEXT(uint hint, uint bits);
void reorderThreadEXT(hitObjectEXT hitObject)
void reorderThreadEXT(hitObjectEXT hitObject, uint hint, uint bits)

void hitObjectExecuteShaderEXT(hitObjectEXT hitObject,
            int payload)

void hitObjectReorderExecuteShaderEXT(hitObjectEXT hitObject,
            int payload)
void hitObjectReorderExecuteShaderEXT(hitObjectEXT hitObject,
            uint hint, uint bits, int payload)

void hitObjectTraceReorderExecuteEXT(hitObjectEXT hitobject,
           accelerationStructureEXT topLevel,
           uint rayFlags,
           uint cullMask,
           uint sbtRecordOffset,
           uint sbtRecordStride,
           uint missIndex,
           vec3 origin,
           float Tmin,
           vec3 direction,
           float Tmax,
           int payload);

void hitObjectTraceReorderExecuteEXT(hitObjectEXT hitobject,
           accelerationStructureEXT topLevel,
           uint rayFlags,
           uint cullMask,
           uint sbtRecordOffset,
           uint sbtRecordStride,
           uint missIndex,
           vec3 origin,
           float Tmin,
           vec3 direction,
           float Tmax,
           uint hint,
           uint bits,
           int payload);

void hitObjectSetSbtRecordIndexEXT(hitObjectEXT hitObject,
           uint sbtRecordIndex);

uint hitObjectGetSbtRecordIndexEXT(hitObjectEXT hitObject);

HLSL provides this functionality with DXR 1.2.

* 
HitObject::TraceRay → OpHitObjectTraceRayEXT

* 
HitObject::FromRayQuery → OpHitObjectRecordFromQueryEXT

* 
HitObject::MakeMiss → OpHitObjectRecordMissEXT

* 
HitObject::MakeNop → OpHitObjectRecordEmptyEXT

* 
HitObject::Invoke → OpHitObjectExecuteShaderEXT

* 
HitObject::IsMiss → OpHitObjectIsMissEXT

* 
HitObject::IsHit → OpHitObjectIsHitEXT

* 
HitObject::IsNop → OpHitObjectIsEmptyEXT

* 
HitObject::GetRayFlags → OpHitObjectGetRayFlagsEXT

* 
HitObject::GetRayTMin → OpHitObjectGetRayTMinEXT

* 
HitObject::GetRayTCurrent → OpHitObjectGetRayTMaxEXT

* 
HitObject::GetWorldRayOrigin → OpHitObjectGetWorldRayOriginEXT

* 
HitObject::GetWorldRayDirection → OpHitObjectGetWorldRayDirectionEXT

* 
HitObject::GetObjectRayOrigin → OpHitObjectGetObjectRayOriginEXT

* 
HitObject::GetObjectRayDirection → OpHitObjectGetObjectRayDirectionEXT

* 
HitObject::GetObjectToWorld3x4 → OpHitObjectGetObjectToWorldEXT

* 
HitObject::GetObjectToWorld4x3 → OpHitObjectGetObjectToWorldEXT

* 
HitObject::GetWorldToObject3x4 → OpHitObjectGetWorldToObjectEXT

* 
HitObject::GetWorldToObject4x3 → OpHitObjectGetWorldToObjectEXT

* 
HitObject::GetInstanceIndex → OpHitObjectGetInstanceCustomIndexEXT

* 
HitObject::GetInstanceID → OpHitObjectGetInstanceIdEXT

* 
HitObject::GetGeometryIndex → OpHitObjectGetGeometryIndexEXT

* 
HitObject::GetPrimitiveIndex → OpHitObjectGetPrimitiveIndexEXT

* 
HitObject::GetHitKind → OpHitObjectGetHitKindEXT

* 
HitObject::GetAttributes → OpHitObjectGetAttributesEXT

* 
HitObject::GetShaderTableIndex → OpHitObjectGetShaderBindingTableRecordIndexEXT

* 
HitObject::SetShaderTableIndex → OpHitObjectSetShaderBindingTableRecordIndexEXT

* 
dx::MaybeReorderThread (HitObject) → OpReorderThreadWithHitObjectEXT

* 
dx::MaybeReorderThread (CoherenceHint) → OpReorderThreadWithHintEXT

* 
dx::MaybeReorderThread (HitObject + CoherenceHint) → OpReorderThreadWithHitObjectEXT

It is possible to use this functionality via
[SPIR-V
Intrinsics](https://github.com/microsoft/DirectXShaderCompiler/wiki/GL_EXT_spirv_intrinsics-for-SPIR-V-code-gen).

The codes for shader invocation reorder are obtained from
[this page](https://github.khronos.org/SPIRV-Registry/extensions//EXT/SPV_EXT_shader_invocation_reorder.html):

The capability and extension need to be added:

[[vk::ext_capability(ShaderInvocationReorderEXT)]]
[[vk::ext_extension("SPV_EXT_shader_invocation_reorder")]]

The creation of the HitObject type can be done like this:

[[vk::ext_type_def(HitObjectAttributeEXT, OpTypeHitObjectEXT)]]
void createHitObjectEXT();
#define HitObjectEXT vk::ext_type

The payload:

* 
must be global

* 
needs the RayPayloadKHR attribute as an extra storage class

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

[[vk::ext_instruction(OpHitObjectRecordEmptyEXT)]]
void hitObjectRecordEmptyEXT([[vk::ext_reference]] HitObjectEXT hitObject);

[[vk::ext_instruction(OpHitObjectTraceRayEXT)]]
void hitObjectTraceRayEXT(
    [[vk::ext_reference]] HitObjectEXT hitObject,
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

[[vk::ext_instruction(OpReorderThreadWithHintEXT)]]
void reorderThreadWithHintEXT(int Hint, int Bits);

[[vk::ext_instruction(OpReorderThreadWithHitObjectEXT)]]
void reorderThreadWithHitObjectEXT([[vk::ext_reference]] HitObjectEXT hitObject);

[[vk::ext_instruction(OpHitObjectExecuteShaderEXT)]]
void hitObjectExecuteShaderEXT([[vk::ext_reference]] HitObjectEXT hitObject, [[vk::ext_reference]] [[vk::ext_storage_class(RayPayloadKHR)]] HitPayload payload);

[[vk::ext_instruction(OpHitObjectIsHitEXT)]]
bool hitObjectIsHitEXT([[vk::ext_reference]] HitObjectEXT hitObject);

Using the function in the code, can be done like this

if (USE_SER == 1)
{
  createHitObjectEXT();
  HitObjectEXT hObj; //  hitObjectEXT hObj;
  hitObjectRecordEmptyEXT(hObj); //Initialize to an empty hit object
  hitObjectTraceRayEXT(hObj, topLevelAS, rayFlags, 0xFF, 0, 0, 0, r.Origin, 0.0, r.Direction, INFINITE, payload);
  reorderThreadWithHitObjectEXT(hObj);
  hitObjectExecuteShaderEXT(hObj, payload);
}

Note:

* 
createHitObjectEXT() needs to be called at least once.
This can be also done in the main entry of the shader.

* 
Function with a payload parameter, needs to have the payload struct
defined before.
There are no templated declaration of the function.

#version 460
#extension GL_EXT_ray_tracing : enable
#extension GL_EXT_buffer_reference_uvec2 : enable
#extension GL_NV_shader_invocation_reorder : enable
layout(binding = 0) uniform accelerationStructureEXT as;
layout(binding = 1, rgba32f) uniform image2D img;
layout(binding = 2) uniform RayParams { vec3 origin;};
layout(location = 0) rayPayloadEXT vec4 Color;
layout(buffer_reference, hitobjectshaderrecordext) buffer SRB
{
    uint materialId;
};
layout(location = 0) hitObjectAttributeEXT vec3 sphereAABB;
void main()
{
    //Trace rays executing custom intersection/any-hit
    vec4 outputColor = vec4(0);
    hitObjectEXT hObj;
    //Initialize to an empty hit object
    hitObjectRecordEmptyEXT(hObj);

    hitObjectTraceRayEXT(hObj,
               as,
               0,
               0,
               0,
               4,
               0,
               origin + vec3(gl_LaunchIDEXT.xyz),
               0.0f,
               origin + vec3(gl_LaunchIDEXT.xyz) + vec3(0,0,1.0f),
               1.0f,
               0);

    uint materialIdHint = 0;

    if (hitObjectIsHitEXT(hObj)) {
        uvec2 handle = hitObjectGetShaderRecordBufferHandleEXT(hObj);
        materialIdHint = SRB(handle).materialId;
    }

    //Reorder threads based on hit object and additional hint on material type
    //Use 3 LSB bits only
    reorderThreadEXT(hObj, materialIdHint, 3);

    //Execute closest hit shaders only
    if (hitObjectIsHitEXT(hObj)) {
        //Get Attributes of intersection
        hitObjectGetAttributesEXT(hObj, 0);
        hitObjectExecuteShaderEXT(hObj, 0);
        outputColor = vec4(Color.x + distance(sphereAABB, vec3(0)));
    }

    imageStore(img, ivec2(gl_LaunchIDEXT.xy), outputColor);

}
