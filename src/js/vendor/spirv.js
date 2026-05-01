// Copyright 2025 Holochip Inc
// SPDX-License-Identifier: MIT

/* eslint-disable max-len */
// NOTE: max-len disabled for vendor file to preserve upstream formatting while avoiding lint noise.

// Based on hlsl.js structure
// SPIR-V language definition for highlight.js

/*
Language: SPIR-V
Description: Standard Portable Intermediate Representation for Vulkan
Author: Generated based on SPIR-V specification
Website: https://www.khronos.org/spir/
Category: graphics
*/

module.exports = function (hljs) {
  // SPIR-V uses decimal and hexadecimal numbers
  const SPIRV_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|\\b\\d+(\\.\\d*)?([fF]?)|\\.\\d+)([eE][-+]?\\d+)?([fF]?)'

  const SPIRV_NUMBER_MODE = {
    className: 'number',
    begin: SPIRV_NUMBER_RE,
    relevance: 0,
  }

  // SPIR-V basic types
  const spirvTypes = [
    'void', 'bool', 'int', 'float', 'double',
    'vec2', 'vec3', 'vec4', 'ivec2', 'ivec3', 'ivec4',
    'uvec2', 'uvec3', 'uvec4', 'bvec2', 'bvec3', 'bvec4',
    'dvec2', 'dvec3', 'dvec4',
    'mat2', 'mat3', 'mat4', 'mat2x2', 'mat2x3', 'mat2x4',
    'mat3x2', 'mat3x3', 'mat3x4', 'mat4x2', 'mat4x3', 'mat4x4',
    'dmat2', 'dmat3', 'dmat4', 'dmat2x2', 'dmat2x3', 'dmat2x4',
    'dmat3x2', 'dmat3x3', 'dmat3x4', 'dmat4x2', 'dmat4x3', 'dmat4x4',
    'sampler1D', 'sampler2D', 'sampler3D', 'samplerCube',
    'sampler1DShadow', 'sampler2DShadow', 'samplerCubeShadow',
    'sampler1DArray', 'sampler2DArray', 'samplerCubeArray',
    'sampler1DArrayShadow', 'sampler2DArrayShadow', 'samplerCubeArrayShadow',
    'isampler1D', 'isampler2D', 'isampler3D', 'isamplerCube',
    'isampler1DArray', 'isampler2DArray', 'isamplerCubeArray',
    'usampler1D', 'usampler2D', 'usampler3D', 'usamplerCube',
    'usampler1DArray', 'usampler2DArray', 'usamplerCubeArray',
    'sampler2DRect', 'sampler2DRectShadow', 'isampler2DRect', 'usampler2DRect',
    'samplerBuffer', 'isamplerBuffer', 'usamplerBuffer',
    'sampler2DMS', 'isampler2DMS', 'usampler2DMS',
    'sampler2DMSArray', 'isampler2DMSArray', 'usampler2DMSArray',
    'samplerCubeArrayShadow',
    'image1D', 'iimage1D', 'uimage1D', 'image2D', 'iimage2D', 'uimage2D',
    'image3D', 'iimage3D', 'uimage3D', 'image2DRect', 'iimage2DRect', 'uimage2DRect',
    'imageCube', 'iimageCube', 'uimageCube', 'imageBuffer', 'iimageBuffer', 'uimageBuffer',
    'image1DArray', 'iimage1DArray', 'uimage1DArray', 'image2DArray', 'iimage2DArray', 'uimage2DArray',
    'imageCubeArray', 'iimageCubeArray', 'uimageCubeArray',
    'image2DMS', 'iimage2DMS', 'uimage2DMS', 'image2DMSArray', 'iimage2DMSArray', 'uimage2DMSArray',
  ]

  return {
    name: 'SPIR-V',
    keywords: {
      keyword:
        // SPIR-V opcodes and instructions
        'OpNop OpUndef OpSourceContinued OpSource OpSourceExtension OpName OpMemberName OpString ' +
        'OpLine OpExtension OpExtInstImport OpExtInst OpMemoryModel OpEntryPoint OpExecutionMode ' +
        'OpCapability OpTypeVoid OpTypeBool OpTypeInt OpTypeFloat OpTypeVector OpTypeMatrix ' +
        'OpTypeImage OpTypeSampler OpTypeSampledImage OpTypeArray OpTypeRuntimeArray OpTypeStruct ' +
        'OpTypeOpaque OpTypePointer OpTypeFunction OpTypeEvent OpTypeDeviceEvent OpTypeReserveId ' +
        'OpTypeQueue OpTypePipe OpTypeForwardPointer OpConstantTrue OpConstantFalse OpConstant ' +
        'OpConstantComposite OpConstantSampler OpConstantNull OpSpecConstantTrue OpSpecConstantFalse ' +
        'OpSpecConstant OpSpecConstantComposite OpSpecConstantOp OpFunction OpFunctionParameter ' +
        'OpFunctionEnd OpFunctionCall OpVariable OpImageTexelPointer OpLoad OpStore OpCopyMemory ' +
        'OpCopyMemorySized OpAccessChain OpInBoundsAccessChain OpPtrAccessChain OpArrayLength ' +
        'OpGenericPtrMemSemantics OpInBoundsPtrAccessChain OpDecorate OpMemberDecorate OpDecorationGroup ' +
        'OpGroupDecorate OpGroupMemberDecorate OpVectorExtractDynamic OpVectorInsertDynamic ' +
        'OpVectorShuffle OpCompositeConstruct OpCompositeExtract OpCompositeInsert OpCopyObject ' +
        'OpTranspose OpSampledImage OpImageSampleImplicitLod OpImageSampleExplicitLod ' +
        'OpImageSampleDrefImplicitLod OpImageSampleDrefExplicitLod OpImageSampleProjImplicitLod ' +
        'OpImageSampleProjExplicitLod OpImageSampleProjDrefImplicitLod OpImageSampleProjDrefExplicitLod ' +
        'OpImageFetch OpImageGather OpImageDrefGather OpImageRead OpImageWrite OpImage OpImageQueryFormat ' +
        'OpImageQueryOrder OpImageQuerySizeLod OpImageQuerySize OpImageQueryLod OpImageQueryLevels ' +
        'OpImageQuerySamples OpConvertFToU OpConvertFToS OpConvertSToF OpConvertUToF OpUConvert ' +
        'OpSConvert OpFConvert OpQuantizeToF16 OpConvertPtrToU OpSatConvertSToU OpSatConvertUToS ' +
        'OpConvertUToPtr OpPtrCastToGeneric OpGenericCastToPtr OpGenericCastToPtrExplicit OpBitcast ' +
        'OpSNegate OpFNegate OpIAdd OpFAdd OpISub OpFSub OpIMul OpFMul OpUDiv OpSDiv OpFDiv OpUMod ' +
        'OpSRem OpSMod OpFRem OpFMod OpVectorTimesScalar OpMatrixTimesScalar OpVectorTimesMatrix ' +
        'OpMatrixTimesVector OpMatrixTimesMatrix OpOuterProduct OpDot OpIAddCarry OpISubBorrow ' +
        'OpUMulExtended OpSMulExtended OpAny OpAll OpIsNan OpIsInf OpIsFinite OpIsNormal OpSignBitSet ' +
        'OpLessOrGreater OpOrdered OpUnordered OpLogicalEqual OpLogicalNotEqual OpLogicalOr ' +
        'OpLogicalAnd OpLogicalNot OpSelect OpIEqual OpINotEqual OpUGreaterThan OpSGreaterThan ' +
        'OpUGreaterThanEqual OpSGreaterThanEqual OpULessThan OpSLessThan OpULessThanEqual ' +
        'OpSLessThanEqual OpFOrdEqual OpFUnordEqual OpFOrdNotEqual OpFUnordNotEqual OpFOrdLessThan ' +
        'OpFUnordLessThan OpFOrdGreaterThan OpFUnordGreaterThan OpFOrdLessThanEqual OpFUnordLessThanEqual ' +
        'OpFOrdGreaterThanEqual OpFUnordGreaterThanEqual OpShiftRightLogical OpShiftRightArithmetic ' +
        'OpShiftLeftLogical OpBitwiseOr OpBitwiseXor OpBitwiseAnd OpNot OpBitFieldInsert OpBitFieldSExtract ' +
        'OpBitFieldUExtract OpBitReverse OpBitCount OpDPdx OpDPdy OpFwidth OpDPdxFine OpDPdyFine ' +
        'OpFwidthFine OpDPdxCoarse OpDPdyCoarse OpFwidthCoarse OpEmitVertex OpEndPrimitive OpEmitStreamVertex ' +
        'OpEndStreamPrimitive OpControlBarrier OpMemoryBarrier OpAtomicLoad OpAtomicStore OpAtomicExchange ' +
        'OpAtomicCompareExchange OpAtomicCompareExchangeWeak OpAtomicIIncrement OpAtomicIDecrement ' +
        'OpAtomicIAdd OpAtomicISub OpAtomicSMin OpAtomicUMin OpAtomicSMax OpAtomicUMax OpAtomicAnd ' +
        'OpAtomicOr OpAtomicXor OpPhi OpLoopMerge OpSelectionMerge OpLabel OpBranch OpBranchConditional ' +
        'OpSwitch OpKill OpReturn OpReturnValue OpUnreachable OpLifetimeStart OpLifetimeStop ' +
        'OpGroupAsyncCopy OpGroupWaitEvents OpGroupAll OpGroupAny OpGroupBroadcast OpGroupIAdd ' +
        'OpGroupFAdd OpGroupFMin OpGroupUMin OpGroupSMin OpGroupFMax OpGroupUMax OpGroupSMax ' +
        'OpReadPipe OpWritePipe OpReservedReadPipe OpReservedWritePipe OpReserveReadPipePackets ' +
        'OpReserveWritePipePackets OpCommitReadPipe OpCommitWritePipe OpIsValidReserveId OpGetNumPipePackets ' +
        'OpGetMaxPipePackets OpGroupReserveReadPipePackets OpGroupReserveWritePipePackets ' +
        'OpGroupCommitReadPipe OpGroupCommitWritePipe OpEnqueueMarker OpEnqueueKernel OpGetKernelNDrangeSubGroupCount ' +
        'OpGetKernelNDrangeMaxSubGroupSize OpGetKernelWorkGroupSize OpGetKernelPreferredWorkGroupSizeMultiple ' +
        'OpRetainEvent OpReleaseEvent OpCreateUserEvent OpIsValidEvent OpSetUserEventStatus ' +
        'OpCaptureEventProfilingInfo OpGetDefaultQueue OpBuildNDRange OpImageSparseSampleImplicitLod ' +
        'OpImageSparseSampleExplicitLod OpImageSparseSampleDrefImplicitLod OpImageSparseSampleDrefExplicitLod ' +
        'OpImageSparseSampleProjImplicitLod OpImageSparseSampleProjExplicitLod OpImageSparseSampleProjDrefImplicitLod ' +
        'OpImageSparseSampleProjDrefExplicitLod OpImageSparseFetch OpImageSparseGather OpImageSparseDrefGather ' +
        'OpImageSparseTexelsResident OpNoLine OpAtomicFlagTestAndSet OpAtomicFlagClear OpImageSparseRead ' +
        'OpSizeOf OpTypePipeStorage OpConstantPipeStorage OpCreatePipeFromPipeStorage OpGetKernelLocalSizeForSubgroupCount ' +
        'OpGetKernelMaxNumSubgroups OpTypeNamedBarrier OpNamedBarrierInitialize OpMemoryNamedBarrier ' +
        'OpModuleProcessed OpExecutionModeId OpDecorateId OpGroupNonUniformElect OpGroupNonUniformAll ' +
        'OpGroupNonUniformAny OpGroupNonUniformAllEqual OpGroupNonUniformBroadcast OpGroupNonUniformBroadcastFirst ' +
        'OpGroupNonUniformBallot OpGroupNonUniformInverseBallot OpGroupNonUniformBallotBitExtract ' +
        'OpGroupNonUniformBallotBitCount OpGroupNonUniformBallotFindLSB OpGroupNonUniformBallotFindMSB ' +
        'OpGroupNonUniformShuffle OpGroupNonUniformShuffleXor OpGroupNonUniformShuffleUp OpGroupNonUniformShuffleDown ' +
        'OpGroupNonUniformIAdd OpGroupNonUniformFAdd OpGroupNonUniformIMul OpGroupNonUniformFMul ' +
        'OpGroupNonUniformSMin OpGroupNonUniformUMin OpGroupNonUniformFMin OpGroupNonUniformSMax ' +
        'OpGroupNonUniformUMax OpGroupNonUniformFMax OpGroupNonUniformBitwiseAnd OpGroupNonUniformBitwiseOr ' +
        'OpGroupNonUniformBitwiseXor OpGroupNonUniformLogicalAnd OpGroupNonUniformLogicalOr ' +
        'OpGroupNonUniformLogicalXor OpGroupNonUniformQuadBroadcast OpGroupNonUniformQuadSwap ' +
        'OpCopyLogical OpPtrEqual OpPtrNotEqual OpPtrDiff OpTerminateInvocation OpSubgroupBallotKHR ' +
        'OpSubgroupFirstInvocationKHR OpSubgroupAllKHR OpSubgroupAnyKHR OpSubgroupAllEqualKHR ' +
        'OpSubgroupReadInvocationKHR OpTraceRayKHR OpExecuteCallableKHR OpConvertUToAccelerationStructureKHR ' +
        'OpIgnoreIntersectionKHR OpTerminateRayKHR OpSDot OpUDot OpSUDot OpSDotAccSat OpUDotAccSat ' +
        'OpSUDotAccSat OpTypeRayQueryKHR OpRayQueryInitializeKHR OpRayQueryTerminateKHR OpRayQueryGenerateIntersectionKHR ' +
        'OpRayQueryConfirmIntersectionKHR OpRayQueryProceedKHR OpRayQueryGetIntersectionTypeKHR ' +
        'OpRayQueryGetRayTMinKHR OpRayQueryGetRayFlagsKHR OpRayQueryGetIntersectionTKHR OpRayQueryGetIntersectionInstanceCustomIndexKHR ' +
        'OpRayQueryGetIntersectionInstanceIdKHR OpRayQueryGetIntersectionInstanceShaderBindingTableRecordOffsetKHR ' +
        'OpRayQueryGetIntersectionGeometryIndexKHR OpRayQueryGetIntersectionPrimitiveIndexKHR ' +
        'OpRayQueryGetIntersectionBarycentricsKHR OpRayQueryGetIntersectionFrontFaceKHR OpRayQueryGetIntersectionCandidateAABBOpaqueKHR ' +
        'OpRayQueryGetIntersectionObjectRayDirectionKHR OpRayQueryGetIntersectionObjectRayOriginKHR ' +
        'OpRayQueryGetWorldRayDirectionKHR OpRayQueryGetWorldRayOriginKHR OpRayQueryGetIntersectionObjectToWorldKHR ' +
        'OpRayQueryGetIntersectionWorldToObjectKHR OpAtomicFAddEXT OpTypeBufferSurfaceINTEL OpTypeStructContinuedINTEL ' +
        'OpConstantCompositeContinuedINTEL OpSpecConstantCompositeContinuedINTEL',

      type:
        // SPIR-V types
        spirvTypes.join(' ') + ' ' +
        'OpTypeVoid OpTypeBool OpTypeInt OpTypeFloat OpTypeVector OpTypeMatrix OpTypeImage ' +
        'OpTypeSampler OpTypeSampledImage OpTypeArray OpTypeRuntimeArray OpTypeStruct OpTypeOpaque ' +
        'OpTypePointer OpTypeFunction OpTypeEvent OpTypeDeviceEvent OpTypeReserveId OpTypeQueue ' +
        'OpTypePipe OpTypeForwardPointer OpTypePipeStorage OpTypeNamedBarrier OpTypeRayQueryKHR ' +
        'OpTypeAccelerationStructureKHR OpTypeCooperativeMatrixNV OpTypeBufferSurfaceINTEL',

      built_in:
        // SPIR-V decorations and built-ins
        'RelaxedPrecision SpecId Block BufferBlock RowMajor ColMajor ArrayStride MatrixStride ' +
        'GLSLShared GLSLPacked CPacked BuiltIn NoPerspective Flat Patch Centroid Sample Invariant ' +
        'Restrict Aliased Volatile Coherent NonWritable NonReadable Uniform UniformId SaturatedConversion ' +
        'Stream Location Component Index Binding DescriptorSet Offset XfbBuffer XfbStride FuncParamAttr ' +
        'FPRoundingMode FPFastMathMode LinkageAttributes NoContraction InputAttachmentIndex Alignment ' +
        'MaxByteOffset AlignmentId MaxByteOffsetId NoSignedWrap NoUnsignedWrap ExplicitInterpAMD ' +
        'OverrideCoverageNV PassthroughNV ViewportRelativeNV SecondaryViewportRelativeNV PerPrimitiveNV ' +
        'PerViewNV PerTaskNV PerVertexKHR PerVertexNV NonUniform RestrictPointer AliasedPointer ' +
        'BindlessSamplerNV BindlessImageNV BoundSamplerNV BoundImageNV SIMTCallINTEL ReferencedIndirectlyINTEL ' +
        'ClobberINTEL SideEffectsINTEL VectorComputeVariableINTEL FuncParamIOKindINTEL VectorComputeFunctionINTEL ' +
        'StackCallINTEL GlobalVariableOffsetINTEL CounterBuffer HlslCounterBufferGOOGLE HlslSemanticGOOGLE ' +
        'UserSemantic UserTypeGOOGLE FunctionRoundingModeINTEL FunctionDenormModeINTEL RegisterINTEL ' +
        'MemoryINTEL NumbanksINTEL BankwidthINTEL MaxPrivateCopiesINTEL SinglepumpINTEL DoublepumpINTEL ' +
        'MaxReplicatesINTEL SimpleDualPortINTEL MergeINTEL BankBitsINTEL ForcePow2DepthINTEL ' +
        'BurstCoalesceINTEL CacheSizeINTEL DontStaticallyCoalesceINTEL PrefetchINTEL StallEnableINTEL ' +
        'FuseLoopsINTEL BufferLocationINTEL IOPipeStorageINTEL FunctionFloatingPointModeINTEL ' +
        'SingleElementVectorINTEL VectorComputeCallableFunctionINTEL MediaBlockIOINTEL ' +

        // Built-in variables
        'Position PointSize ClipDistance CullDistance VertexId InstanceId PrimitiveId InvocationId ' +
        'Layer ViewportIndex TessLevelOuter TessLevelInner TessCoord PatchVertices FragCoord FrontFacing ' +
        'PointCoord SampleId SamplePosition SampleMask FragDepth HelperInvocation NumWorkgroups ' +
        'WorkgroupSize WorkgroupId LocalInvocationId GlobalInvocationId LocalInvocationIndex ' +
        'WorkDim GlobalSize EnqueuedWorkgroupSize GlobalOffset NumEnqueuedSubgroups NumSubgroups ' +
        'SubgroupSize SubgroupMaxSize NumSubgroups SubgroupId SubgroupLocalInvocationId ' +
        'VertexIndex InstanceIndex DrawIndex BaseVertex BaseInstance DeviceIndex ViewIndex ' +
        'BaryCoordNoPerspAMD BaryCoordNoPerspCentroidAMD BaryCoordNoPerspSampleAMD BaryCoordSmoothAMD ' +
        'BaryCoordSmoothCentroidAMD BaryCoordSmoothSampleAMD BaryCoordPullModelAMD FragStencilRefEXT ' +
        'ViewportMaskNV SecondaryPositionNV SecondaryViewportMaskNV PositionPerViewNV ViewportMaskPerViewNV ' +
        'FullyCoveredEXT TaskCountNV PrimitiveCountNV PrimitiveIndicesNV ClipDistancePerViewNV ' +
        'CullDistancePerViewNV LayerPerViewNV MeshViewCountNV MeshViewIndicesNV BaryCoordKHR ' +
        'BaryCoordNoPerspKHR FragSizeEXT FragInvocationCountEXT LaunchIdKHR LaunchSizeKHR ' +
        'WorldRayOriginKHR WorldRayDirectionKHR ObjectRayOriginKHR ObjectRayDirectionKHR ' +
        'RayTminKHR RayTmaxKHR InstanceCustomIndexKHR InstanceIdKHR GeometryIndexKHR PrimitiveIdKHR ' +
        'ObjectToWorldKHR WorldToObjectKHR HitTNV HitKindKHR HitKindNV IncomingRayFlagsKHR ' +
        'IncomingRayFlagsNV RayGeometryIndexKHR WarpsPerSMNV SMCountNV WarpIDNV SMIDNV',

      literal: 'true false',
    },
    illegal: /[{}]/,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      SPIRV_NUMBER_MODE,
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE],
      },
      {
        className: 'meta',
        begin: ';',
        end: '$',
      },
      {
        className: 'symbol',
        begin: '%[a-zA-Z_][a-zA-Z0-9_]*',
      },
      {
        className: 'symbol',
        begin: '%\\d+',
      },
    ],
  }
}
